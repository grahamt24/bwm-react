import React from "react";

export const BwmTextArea = ({
    input,
    label,
    type,
    rows,
    className,
    meta: { touched, error }
}) => (
    <div className="form-group">
        <label>{label}</label>
        <div className="input-group">
            <textarea {...input} type={type} rows={rows} className={className} />
        </div>
        {touched &&
        ((error && <div className="alert alert-danger">{error}</div>))}
    </div>
);