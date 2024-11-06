import router from "@/router";


function ifExistRouterBackHistory() {
    // console.log("router", router);
    // console.log("router back", router.options.history.state.back);
    // console.log("router back history", router.options.history);

    if (router.options.history.state.back) {
      return true;
    }
    return false;
  }
export default function goBackOrHome() {


    if (ifExistRouterBackHistory() === true) {
        router.back();
    } else {
        router.push("/");
    }


}

export function goTohome() {
  router.push("/");
}
