import styles from './AddCarModal.module.css'

export const AddCarModal = ({ onAddCarSubmit, onAddCarInputChange, onAddCarCheckboxChange, hideAddCarModal }: any) => {
    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <form noValidate onSubmit={onAddCarSubmit}>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car">Company: </label>
                        <input className={styles.input} id="car" type="text" name="car" onChange={onAddCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car_color">Color: </label>
                        <input className={styles.input} id="car_color" type="text" name="car_color" onChange={onAddCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car_model">Model: </label>
                        <input className={styles.input} id="car_model" type="text" name="car_model" onChange={onAddCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car_model_year">Year: </label>
                        <input className={styles.input} id="car_model_year" type="text" name="car_model_year" onChange={onAddCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="car_vin">VIN: </label>
                        <input className={styles.input} id="car_vin" type="text" name="car_vin" onChange={onAddCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="price">Price: </label>
                        <input className={styles.input} id="price" type="text" name="price" onChange={onAddCarInputChange} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label  className={styles.label} htmlFor="availability">Availability: </label>
                        <input className={styles.input} id="availability" type="checkbox" name="availability" onChange={onAddCarCheckboxChange} />
                    </div>

                    <div>
                        <button className={`${styles.button} ${styles.buttonDanger}`}   type="button" onClick={hideAddCarModal}>Cancel</button>
                        <button className={styles.button}  type="button" onClick={onAddCarSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}