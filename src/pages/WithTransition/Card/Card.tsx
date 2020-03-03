import React, { ReactNode, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './styles.module.scss'

interface Props {
  children?: ReactNode;
}

const Card: React.FC<Props> = ({ children }) => {
  const { id } = useParams();
  let content = "";
  let cls = styles.content;
  if (id) {
    content = id.repeat(390);
    cls = `${styles.content} ${styles.active}`;
  }
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  return (
    <>
      {id ? (
        <Link to={`/with`}>
          <div className={ styles.container }>
            <div className={cls}>
              <div className={ styles.number }>
                <div className={ styles['number--small'] }>{content}</div>
              </div>
            </div>
          </div>
          <div className={ styles.container }>
            <div className={cls}>
              <div className={ styles.number }>
                <div className={ styles['number--small'] }>{content}</div>
              </div>
            </div>
          </div>
          <div className={ styles.container }>
            <div className={cls}>
              <div className={ styles.number }>
                <div className={ styles['number--small'] }>{content}</div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className={ styles.container }>
          <div className={cls}>
            <div className={ styles.number }>
              <div className={ styles['number--large'] }>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
