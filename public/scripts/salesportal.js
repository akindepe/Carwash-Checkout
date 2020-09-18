const openSideNav = document.getElementById("open-side-nav");
const sideNav = document.getElementById("mySidenav");
const closeSideNav = document.getElementById("close-btn");
openSideNav.addEventListener("click", () => {
  sideNav.style.width = "250px";
});
closeSideNav.addEventListener("click", ()=>{sideNav.style.width = "0";});