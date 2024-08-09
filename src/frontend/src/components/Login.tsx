import { useEffect } from "react";
import Button from "../ui/Button";
import axios from "axios";
import { useLoginContext } from "../contexts/LoginProvider";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon } from "../assets/svg";

axios.defaults.withCredentials = true;

const Login: React.FC<{ type?: string }> = ({ type = "login" }) => {
  const { t } = useTranslation();
  const { user, loginUser } = useLoginContext();

  const text = t(`btn.${type}`);

  const loginWithGitHub = () => {
    window.location.href = `${import.meta.env.VITE_BACK_URL}/auth/github`;
  };
  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_BACK_URL}/auth/google`;
  };

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      // Check if the user is authenticated by sending a request to the backend
      // const response = await axios.get(
      //   `${import.meta.env.VITE_BACK_URL}/user`,
      //   {
      //     withCredentials: true,
      //     // headers: {
      //     //   "Access-Control-Allow-Origin": "*",
      //     //   "Content-Type": "application/json",
      //     // },
      //   },
      // );
      // const loggedUser = response.data;

      // const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user`, {
      //   method: "GET",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const response = await fetch("https://chopchop-url.onrender.com/user", {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "accept-language": "es-ES,es;q=0.5",
          "cache-control": "no-cache",
          pragma: "no-cache",
          priority: "u=0, i",
          "sec-ch-ua":
            '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "sec-gpc": "1",
          "upgrade-insecure-requests": "1",
          cookie:
            "connect.sid=s%3Az5A8uah3Pl6SuT8Fsklny9aGjlYtoeS1.OhB4qNUN1lXNmOoe%2FVs%2FvmJMVEGZKo8xFy%2BFxdnNueI; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwNzEyMTkxIiwiZGlzcGxheU5hbWUiOiJKYXZpZXIgUnVpeiIsInVzZXJuYW1lIjoiSmF2aWVyUlpSIiwicHJvZmlsZVVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9KYXZpZXJSWlIiLCJwaG90b3MiOlt7InZhbHVlIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzgwNzEyMTkxP3Y9NCJ9XSwicHJvdmlkZXIiOiJnaXRodWIiLCJfcmF3Ijoie1wibG9naW5cIjpcIkphdmllclJaUlwiLFwiaWRcIjo4MDcxMjE5MSxcIm5vZGVfaWRcIjpcIk1EUTZWWE5sY2pnd056RXlNVGt4XCIsXCJhdmF0YXJfdXJsXCI6XCJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvODA3MTIxOTE_dj00XCIsXCJncmF2YXRhcl9pZFwiOlwiXCIsXCJ1cmxcIjpcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvSmF2aWVyUlpSXCIsXCJodG1sX3VybFwiOlwiaHR0cHM6Ly9naXRodWIuY29tL0phdmllclJaUlwiLFwiZm9sbG93ZXJzX3VybFwiOlwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy9KYXZpZXJSWlIvZm9sbG93ZXJzXCIsXCJmb2xsb3dpbmdfdXJsXCI6XCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL0phdmllclJaUi9mb2xsb3dpbmd7L290aGVyX3VzZXJ9XCIsXCJnaXN0c191cmxcIjpcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvSmF2aWVyUlpSL2dpc3Rzey9naXN0X2lkfVwiLFwic3RhcnJlZF91cmxcIjpcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvSmF2aWVyUlpSL3N0YXJyZWR7L293bmVyfXsvcmVwb31cIixcInN1YnNjcmlwdGlvbnNfdXJsXCI6XCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL0phdmllclJaUi9zdWJzY3JpcHRpb25zXCIsXCJvcmdhbml6YXRpb25zX3VybFwiOlwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy9KYXZpZXJSWlIvb3Jnc1wiLFwicmVwb3NfdXJsXCI6XCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL0phdmllclJaUi9yZXBvc1wiLFwiZXZlbnRzX3VybFwiOlwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy9KYXZpZXJSWlIvZXZlbnRzey9wcml2YWN5fVwiLFwicmVjZWl2ZWRfZXZlbnRzX3VybFwiOlwiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy9KYXZpZXJSWlIvcmVjZWl2ZWRfZXZlbnRzXCIsXCJ0eXBlXCI6XCJVc2VyXCIsXCJzaXRlX2FkbWluXCI6ZmFsc2UsXCJuYW1lXCI6XCJKYXZpZXIgUnVpelwiLFwiY29tcGFueVwiOm51bGwsXCJibG9nXCI6XCJcIixcImxvY2F0aW9uXCI6bnVsbCxcImVtYWlsXCI6bnVsbCxcImhpcmVhYmxlXCI6bnVsbCxcImJpb1wiOm51bGwsXCJ0d2l0dGVyX3VzZXJuYW1lXCI6bnVsbCxcIm5vdGlmaWNhdGlvbl9lbWFpbFwiOm51bGwsXCJwdWJsaWNfcmVwb3NcIjo2LFwicHVibGljX2dpc3RzXCI6MCxcImZvbGxvd2Vyc1wiOjMsXCJmb2xsb3dpbmdcIjozLFwiY3JlYXRlZF9hdFwiOlwiMjAyMS0wMy0xNVQxODoxNzo0NFpcIixcInVwZGF0ZWRfYXRcIjpcIjIwMjQtMDgtMDZUMTk6MDY6MjRaXCJ9IiwiX2pzb24iOnsibG9naW4iOiJKYXZpZXJSWlIiLCJpZCI6ODA3MTIxOTEsIm5vZGVfaWQiOiJNRFE2VlhObGNqZ3dOekV5TVRreCIsImF2YXRhcl91cmwiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvODA3MTIxOTE_dj00IiwiZ3JhdmF0YXJfaWQiOiIiLCJ1cmwiOiJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL0phdmllclJaUiIsImh0bWxfdXJsIjoiaHR0cHM6Ly9naXRodWIuY29tL0phdmllclJaUiIsImZvbGxvd2Vyc191cmwiOiJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL0phdmllclJaUi9mb2xsb3dlcnMiLCJmb2xsb3dpbmdfdXJsIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy9KYXZpZXJSWlIvZm9sbG93aW5ney9vdGhlcl91c2VyfSIsImdpc3RzX3VybCI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvSmF2aWVyUlpSL2dpc3Rzey9naXN0X2lkfSIsInN0YXJyZWRfdXJsIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy9KYXZpZXJSWlIvc3RhcnJlZHsvb3duZXJ9ey9yZXBvfSIsInN1YnNjcmlwdGlvbnNfdXJsIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy9KYXZpZXJSWlIvc3Vic2NyaXB0aW9ucyIsIm9yZ2FuaXphdGlvbnNfdXJsIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy9KYXZpZXJSWlIvb3JncyIsInJlcG9zX3VybCI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvSmF2aWVyUlpSL3JlcG9zIiwiZXZlbnRzX3VybCI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvSmF2aWVyUlpSL2V2ZW50c3svcHJpdmFjeX0iLCJyZWNlaXZlZF9ldmVudHNfdXJsIjoiaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy9KYXZpZXJSWlIvcmVjZWl2ZWRfZXZlbnRzIiwidHlwZSI6IlVzZXIiLCJzaXRlX2FkbWluIjpmYWxzZSwibmFtZSI6IkphdmllciBSdWl6IiwiY29tcGFueSI6bnVsbCwiYmxvZyI6IiIsImxvY2F0aW9uIjpudWxsLCJlbWFpbCI6bnVsbCwiaGlyZWFibGUiOm51bGwsImJpbyI6bnVsbCwidHdpdHRlcl91c2VybmFtZSI6bnVsbCwibm90aWZpY2F0aW9uX2VtYWlsIjpudWxsLCJwdWJsaWNfcmVwb3MiOjYsInB1YmxpY19naXN0cyI6MCwiZm9sbG93ZXJzIjozLCJmb2xsb3dpbmciOjMsImNyZWF0ZWRfYXQiOiIyMDIxLTAzLTE1VDE4OjE3OjQ0WiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA4LTA2VDE5OjA2OjI0WiJ9LCJpYXQiOjE3MjMxOTYyNDksImV4cCI6MTcyMzIxNDI0OX0.a1l_RydzxnpEnLRolz7Mv_9rFLFMh8Uz-ztDFAgGFWc",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("No ha logeado una mierda");
      }
      const loggedUser = await response.json();
      loginUser(loggedUser);
      // setUser(loggedUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      {!user && (
        <>
          <Button onClick={loginWithGitHub}>
            {text}
            <ArrowRightIcon size={20} color="#888" />
          </Button>
          <Button onClick={loginWithGoogle}>
            {text + " google"}
            <ArrowRightIcon size={20} color="#888" />
          </Button>
        </>
      )}
    </>
  );
};
export default Login;
