import React, {FC, memo} from 'react';
import {Field} from "formik";
import {FieldAttributes} from "formik/dist/Field";
import {WarningTwoTone} from '@ant-design/icons';
import styles from "./CustomField.module.scss"

const CustomField: FC<FieldAttributes<any>> = props => {
  return (
    <div className={styles.fieldBox}><Field {...props} />
      {props.errormessage && <span title={props.errormessage} className={styles.icon}>
                <WarningTwoTone twoToneColor="#dc3545" style={{fontSize: 20}}/></span>}
    </div>
  )
}

export default memo(CustomField);
