import React, { useCallback, useState } from "react";
import {
  LoginSocialFacebook,
  LoginSocialInstagram,
  LoginSocialTwitter,
  IResolveParams,
} from "reactjs-social-login";

import {
  FacebookLoginButton,
  InstagramLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";

const REDIRECT_URI = "https://social-login-vkef.vercel.app/";

export function FacebookLogin() {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);
  return (
    <LoginSocialFacebook
      appId={process.env.REACT_APP_FB_APP_ID || ""}
      fieldsProfile={
        "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
      }
      onLoginStart={onLoginStart}
      onLogoutSuccess={onLogoutSuccess}
      redirect_uri={REDIRECT_URI}
      onResolve={({ provider, data }: IResolveParams) => {
        setProvider(provider);
        setProfile(data);
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
}

export function InstaLogin() {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState<any>();

  // const handleInstagramLogin = (response: { code: any }) => {
  //   // Call Instagram API to get user's profile data
  //   fetch(
  //     `https://graph.instagram.com/api/instagram/profile?code=${response.code}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data, "data insta");
  //     })
  //     .catch((error) => console.error(error));
  // };

  // const accessToken = "YOUR_ACCESS_TOKEN";
  // const userId = "USER_ID";
  // const apiUrl = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;

  // fetch(apiUrl)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const posts = data.data;
  //     // Process the data and display it on your page
  //   })
  //   .catch((error) => console.error(error));

  const onLoginStart = useCallback(() => {
    alert("login start");
    console.log("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);

  function handleClick() {
    fetch(`https://graph.instagram.com/v11.0/697931565407513/`)
      .then((response) => response.json())
      .then((data) => {
        const posts = data.data;
        console.log(posts, "post");
        // Process the data and display it on your page
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <LoginSocialInstagram
        client_id={"708082450813052" || ""}
        client_secret={"0c0d6efd7e07e1317cf69396de33cf84" || ""}
        redirect_uri={REDIRECT_URI}
        scope="user_profile,user_media"
        state="1"
        onLoginStart={onLoginStart}
        onLogoutSuccess={onLogoutSuccess}
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
          console.log(data, "data");
        }}
        onReject={(err: any) => {
          console.log(err);
        }}
      >
        <InstagramLoginButton />
      </LoginSocialInstagram>
      {/* <button onClick={handleClick}>Instagram</button> */}
    </div>
  );
}

export function TwitterLogin() {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState<any>();

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);
  return (
    <div>
      <LoginSocialTwitter
        client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ""}
        // client_secret={process.env.REACT_APP_TWITTER_V2_APP_SECRET || ''}
        redirect_uri={REDIRECT_URI}
        onLoginStart={onLoginStart}
        onLogoutSuccess={onLogoutSuccess}
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err: any) => {
          console.log(err);
        }}
      >
        <TwitterLoginButton />
      </LoginSocialTwitter>
    </div>
  );
}
