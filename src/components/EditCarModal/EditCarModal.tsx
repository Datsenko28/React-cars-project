import styles from './EditCarModal.module.css'

// type Props ={
//     onEditCarSubmit: () => void
//     editCarForm: () => void
// }

export const EditCarModal = ({ onEditCarSubmit, editCarForm, onEditCarInputChange, onEditCarCheckboxChange, hideEditCarModal }: any) => {
    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <form noValidate onSubmit={onEditCarSubmit}>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car">Company: </label>
                        <input className={styles.input} readOnly id="car" type="text" name="car" value={editCarForm.car} onChange={onEditCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car_model">Model: </label>
                        <input className={styles.input} readOnly id="car_model" type="text" name="car_model" value={editCarForm.car_model} onChange={onEditCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car_model_year">Year: </label>
                        <input className={styles.input} readOnly id="car_model_year" type="text" name="car_model_year" value={editCarForm.car_model_year} onChange={onEditCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car_vin">VIN: </label>
                        <input className={styles.input} readOnly id="car_vin" type="text" name="car_vin" value={editCarForm.car_vin} onChange={onEditCarInputChange} />
                    </div>

                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car_color">Color: </label>
                        <input className={styles.input} id="car_color" type="text" name="car_color" value={editCarForm.car_color} onChange={onEditCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="price">Price: </label>
                        <input className={styles.input} id="price" type="text" name="price" value={editCarForm.price} onChange={onEditCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="availability">Availability: </label>
                        <input className={styles.input} id="availability" type="checkbox" name="availability" checked={editCarForm.availability} onChange={onEditCarCheckboxChange} />
                    </div>

                    <div>
                        <button type="button" onClick={hideEditCarModal}>Cancel</button>
                        <button type="button" onClick={onEditCarSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}