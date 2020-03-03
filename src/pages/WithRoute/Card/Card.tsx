import React, { useContext } from "react";
import { Route, useLocation } from "react-router-dom";
import { Context } from "../Context/context";
import styles from './styles.module.scss'

interface Props {
  route?: string;
  called?: boolean;
  index?: number;
}

const Card: React.FC<Props> = ({ index }) => {
  const { arr } = useContext(Context);
  const i = index!;
  const { route } = arr[i];
  return (
      <div className={ styles.container }>
        <div className={ styles.content }>
          <div className={ styles.number }>
            <div className={ styles['number--small'] }>
                <Route path={'/with-route' + route}>
                  <div>{` Route ${route} component` }</div>
                </Route>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
