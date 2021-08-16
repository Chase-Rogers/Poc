import React, { useContext, useEffect } from 'react';
import { ContentContext } from '../../context/ContentProvider';

export default function Modal(props) {
    const { show, setShow, children } = props;
    const { isSuccessful, setIsSuccessful } = useContext(ContentContext);

    useEffect(() => {
        if (isSuccessful) {
            handleClose();
            setIsSuccessful(false);
        }
    }, [isSuccessful]);

    const handleClose = (e) => {
        setShow(false);
    };

    const handleEscapeKey = (e) => {
        if (e.keyCode === 27) setShow(false);
    };

    return (
        <>
            {show ? (
                <div className="modal" onKeyDown={handleEscapeKey} tabIndex={0}>
                    <div className="modal-content">
                        <button
                            onClick={() => {
                                handleClose();
                            }}
                            className="close"
                        >
                            X
                        </button>
                        {children}
                    </div>
                </div>
            ) : null}
        </>
    );
}
