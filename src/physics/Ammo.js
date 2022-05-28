const ammoPromise = window.Ammo()
ammoPromise.then(function (AmmoLib) {
    window.Ammo = AmmoLib;
    // console.log(window.Ammo)
});

export default Ammo;
export { ammoPromise }