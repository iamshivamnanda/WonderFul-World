import React, { useState, useContext } from "react";
import Card from "../../../shared/components/Card/Card";
import Button from "../../../shared/components/FormELements/Button/Button";
import Modal from "../../../shared/components/Modal/Modal";
import Map from "../../../shared/components/Map/Map";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/Spinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/Modal/ErrorModal";
import "./PlaceItem.css";

const PlaceItem = (props) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL+`/places/${props.id}`,
                "DELETE",
                null,{
                  Authorization: "Bearer " + auth.token
                }
            );
            props.onDelete(props.id);
        } catch (error) {}
    };

    return (
        <React.Fragment>
            {<ErrorModal error={error} onClear={clearError} />}
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.location} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>
                    Do you want to proceed and delete this place? Please note
                    that it can't be undone thereafter.
                </p>
            </Modal>
            <div className="place-item">
                <Card className="place-item__content">
                    {isLoading ? <LoadingSpinner asOverlay /> : null}
                    <div className="place-item__image">
                        <img
                            src={process.env.REACT_APP_ASSET_URL+`/${props.image}`}
                            alt={props.title}
                        />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>
                            View On Map
                        </Button>
                        {auth.id === props.createrId && (
                            <Button to={`/places/${props.id}`}>EDIT</Button>
                        )}

                        {auth.id === props.createrId && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default PlaceItem;
