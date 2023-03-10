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
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);

  return (
    <div>
      <LoginSocialInstagram
        client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ""}
        client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ""}
        redirect_uri={REDIRECT_URI}
        scope={"basic"}
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
