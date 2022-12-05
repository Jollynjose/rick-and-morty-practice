const SignOutView = (logoutHandler) => {
  const signOut = document.getElementById("signout");
  signOut.addEventListener("click", async (e) => {
    try {
      await logoutHandler();
      window.location.replace("/login");
    } catch (error) {
      console.error(error);
    }
  });
};

export default SignOutView;
