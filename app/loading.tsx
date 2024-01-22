import style from "@styles/loadingcom.module.css";

const LoadingCom = () => {
  return (
    <div className={`${style.preloader_box}`}>
      <div className={`${style.preloader_left}`}></div>
      <div className={`${style.preloader_right}`}></div>
      <div className={`${style.preloader}`}>
        <span className={style.inner}>S</span>
        <span className={style.inner}>H</span>
        <span className={style.inner}>I</span>
        <span className={style.inner}>M</span>
        <span className={style.inner}>M</span>
        <span className={style.inner}>E</span>
        <span className={style.inner}>R</span>
      </div>
    </div>
  );
};

export default LoadingCom;
