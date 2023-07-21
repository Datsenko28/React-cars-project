import {useEffect, useState} from "react";
import styles from './CarsController.module.css';
import {EditCarModal} from "./EditCarModal/EditCarModal";
import {AddCarModal} from "./AddCarModal/AddCarModal";

const API_URL = "https://myfakeapi.com/api/cars/"
const PER_PAGE = 5
const NEAREST_PAGES_TO_SHOW = 2

type Car = {
    availability: boolean
    car: string
    car_color: string
    car_model: string
    car_model_year: number
    car_vin: string
    id: number
    price: string
}

type CarForm = {
    availability: boolean
    car: string
    car_color: string
    car_model: string
    car_model_year: string
    car_vin: string
    price: string
    id: number
}

const getCars = async (): Promise<Car[]> => {
    return fetch(API_URL).then(r => r.json())
        .then(j => j.cars)
}

const filterCarsByText = (cars: Car[], searchText: string) => {
    return cars.filter(car => {
        return searchText === ''
            || car.car.includes(searchText)
            || car.car_color.includes(searchText)
            || car.car_model.includes(searchText)
            || car.car_model_year.toString().includes(searchText)
            || car.car_vin.includes(searchText)
            || car.price.includes(searchText)
    })
}

const getPagesOptions = (totalPages: number, currentPage: number): number[] => {
    const result = []
    for (let i = 1; i <= totalPages; i++) {
        const needToRender = Math.abs(currentPage - i) <= NEAREST_PAGES_TO_SHOW
            || i === 1
            || i === totalPages;

        if (needToRender) {
            result.push(i)
        }
    }
    return result
}

const loadData = () => {
    const dataAsStr = localStorage.getItem('apiCars')
    if (!dataAsStr) {
        return null
    } else {
        return JSON.parse(dataAsStr)
    }
}
const saveData = (apiCars: Car[]) => {
    localStorage.setItem('apiCars', JSON.stringify(apiCars))
}

export const CarsController = () => {
    const [apiCars, setApiCars] = useState<Car[] | null>(null)
    const [searchText, setSearchText] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [isAddCarModalVisible, setIsAddCarModalVisible] = useState<boolean>(false)
    const [addCarForm, setAddCarForm] = useState<CarForm>({
        availability: false,
        car: '',
        car_color: '',
        car_model: '',
        car_model_year: '',
        car_vin: '',
        price: '',
        id: 0,
    })

    const [isEditCarModalVisible, setIsEditCarModalVisible] = useState<boolean>(false)
    const [editCarForm, setEditCarForm] = useState<CarForm>({
        availability: false,
        car: '',
        car_color: '',
        car_model: '',
        car_model_year: '',
        car_vin: '',
        price: '',
        id: 0,
    })

    useEffect(() => {
        const carsFromLs = loadData()
        if (carsFromLs) {
            setApiCars(carsFromLs)
        } else {
            getCars().then(apiCars => {
                setApiCars(apiCars)
            })
        }
    }, [])

    useEffect(() => {
        if (apiCars) {
            saveData(apiCars as Car[])
        }
    }, [apiCars])

    const onEdit = (id: number) => {
        onEditCarClick(id)
    }
    const onDelete = (id: number) => {
        // @ts-ignore
        const isConfirmed = window.confirm(`Are you sure want to delete ${(apiCars as Car[]).find(c => c.id === id).car_vin} car?`)
        if (!   isConfirmed){
            return;
        }
        setApiCars(
            (apiCars as Car[]).filter(car => car.id !== id)
        )
        setCurrentPage(1)
    }

    const onPrevPage = () => {
        setCurrentPage(p => p - 1)
    }
    const onNextPage = () => {
        setCurrentPage(p => p + 1)
    }

    const onSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        setSearchText(e.target.value)
        setCurrentPage(1)
    }

    const isLoading = apiCars === null
    const filteredCars = apiCars ? filterCarsByText(apiCars, searchText) : []
    const totalPages = Math.ceil(filteredCars.length / PER_PAGE)

    const pagesOptions = getPagesOptions(totalPages, currentPage)
    const paginatedCars = filteredCars.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
    )

    // add form
    const onAddCarClick = () => {
        setIsAddCarModalVisible(true)
    }
    const hideAddCarModal = () => {
        setIsAddCarModalVisible(false)
    }
    const onAddCarInputChange = (e: any) => {
        // @ts-ignore
        const { name, value } = e.target;
        setAddCarForm(s => {
            return {
                ...s,
                [name]: value
            }
        })
    }
    const onAddCarCheckboxChange = (e: any) => {
        // @ts-ignore
        const { name, checked } = e.target;
        setAddCarForm(s => {
            return {
                ...s,
                [name]: checked
            }
        })
    }
    const onAddCarSubmit = () => {
        (apiCars as Car[]).unshift({
            availability: addCarForm.availability,
            car: addCarForm.car,
            car_color: addCarForm.car_color,
            car_model: addCarForm.car_model,
            car_model_year: parseInt(addCarForm.car_model_year) || 0,
            car_vin: addCarForm.car_vin,
            id: Date.now(),
            price: addCarForm.price,
        })
        setApiCars([...(apiCars as Car[])])
        setIsAddCarModalVisible(false)
    }

    // edit form
    const onEditCarClick = (id: number) => {
        const carById = (apiCars as Car[]).find(car => car.id === id) as Car
        setEditCarForm({
            availability: carById.availability,
            car: carById.car,
            car_color: carById.car_color,
            car_model: carById.car_model,
            car_model_year: carById.car_model_year.toString(),
            car_vin: carById.car_vin,
            price: carById.price,
            id: carById.id,
        })
        setIsEditCarModalVisible(true)
    }
    const onEditCarInputChange = (e: any) => {
        // @ts-ignore
        const { name, value } = e.target;
        setEditCarForm(s => {
            return {
                ...s,
                [name]: value
            }
        })
    }
    const onEditCarCheckboxChange = (e: any) => {
        // @ts-ignore
        const { name, checked } = e.target;
        setEditCarForm(s => {
            return {
                ...s,
                [name]: checked
            }
        })
    }
    const hideEditCarModal = () => {
        setIsEditCarModalVisible(false)
    }
    const onEditCarSubmit = () => {
        const apiCarToEdit = (apiCars as Car[]).find(car => car.id === editCarForm.id) as Car
        apiCarToEdit.availability = editCarForm.availability
        apiCarToEdit.car = editCarForm.car
        apiCarToEdit.car_color = editCarForm.car_color
        apiCarToEdit.car_model = editCarForm.car_model
        apiCarToEdit.car_model_year = parseInt(editCarForm.car_model_year) || 0
        apiCarToEdit.car_vin = editCarForm.car_vin
        apiCarToEdit.price = editCarForm.price
        setApiCars([...(apiCars as Car[])])
        setIsEditCarModalVisible(false)
    }

    return <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.logo}>
                <h1>
                    Igor Datsenko
                </h1>
                <span>
                    student of CHI IT Academy
                </span>
            </div>
            <div className={styles.headerActions}>
                <button onClick={onAddCarClick} className={`${styles.button}`}>+ Add Car</button>
                <input type="text" onChange={onSearchChange} className={styles.searchInput} />
            </div>
        </div>
        <div>
            {
                isLoading
                    ?
                    "Loading..."
                    :
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Company</th>
                            <th>Model</th>
                            <th>VIN</th>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            paginatedCars.map(car => (
                                <tr key={car.id}>
                                    <td>{car.car}</td>
                                    <td>{car.car_model}</td>
                                    <td>{car.car_vin}</td>
                                    <td>{car.car_color}</td>
                                    <td>{car.car_model_year}</td>
                                    <td>{car.price}</td>
                                    <td>{car.availability ? "Yes" : "No"}</td>
                                    <td>
                                        <button className={styles.button} onClick={() => onEdit(car.id)}>Edit</button>
                                        <button className={`${styles.button} ${styles.buttonDanger}`} onClick={() => onDelete(car.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
            }

            <div className={styles.pagination}>
                <div className={styles.summary}>
                    {`Cars total: ${filteredCars.length}. Page: ${currentPage}/${totalPages}`}
                </div>
                <div className={styles.buttonsList}>
                    <button className={styles.button} onClick={onPrevPage} disabled={currentPage === 1}>{'<'}</button>
                    {
                        pagesOptions.map(pageNumber => (
                            <button key={pageNumber} className={`${styles.button} ${pageNumber === currentPage && styles.active}`} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</button>
                        ))
                    }
                    <button className={styles.button} onClick={onNextPage} disabled={currentPage === totalPages}>{'>'}</button>
                </div>
            </div>
        </div>

        {
            isAddCarModalVisible
                ? <AddCarModal
                    onAddCarSubmit={onAddCarSubmit}
                    onAddCarInputChange={onAddCarInputChange}
                    onAddCarCheckboxChange={onAddCarCheckboxChange}
                    hideAddCarModal={hideAddCarModal}
                />
                : null
        }
        {
            isEditCarModalVisible
                ? <EditCarModal
                    editCarForm={editCarForm}
                    onEditCarSubmit={onEditCarSubmit}
                    onEditCarInputChange={onEditCarInputChange}
                    onEditCarCheckboxChange={onEditCarCheckboxChange}
                    hideEditCarModal={hideEditCarModal}
                />
                : null
        }

    </div>
}