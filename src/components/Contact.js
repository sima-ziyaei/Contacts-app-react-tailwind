import React, { Component } from 'react';
import Modal from 'react-modal';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi'

let defaultError = true;

class Contact extends Component {

    constructor() {
        super();
        this.state = {
            fName: "",
            email: "",
            lName: "",
            number: "",
            errorName: "",
            errorLName: "",
            errorNumber: "",
            errorEmail: "",
            modalISOpen: false,
            personInfo: [],
            delete: false,
            deleteUserId: '',
            editedUser: '',
            editedFName: '',
            addBtn: 'اضافه کردن',
            formModalIsOpen: false,
            editId: '',
            infoModalIsOpen: false,
            newUser: "مخاطب جدید",
            // editedUser: {
            //     fName: '',
            //     lName: '',
            //     email: '',
            //     number: '',
            //     relation: '',
            //     id: ''
            // },
            // toggleState:false,
        };
    }

    handelChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, this.validate);
    };

    validate = () => {
        this.validateName();
        this.validateLName();
        this.validateNumber();
        this.validateEmail();

    };

    validateName = () => {
        const { fName } = this.state;
        if (fName === "") {
            this.setState({ errorName: "نام اجباری است" });
        } else if (fName.length <= 2) {
            this.setState({ errorName: "نام باید بیشتر از دو حرف باشد" });
        }
        else {
            this.setState({ errorName: "" });
        }
    };

    validateLName = () => {
        const { lName } = this.state;
        if (lName === "") {
            this.setState({ errorLName: "نام خانوادگی اجباری است" });
        } else if (lName.length <= 2) {
            this.setState({ errorLName: "نام خانوادگی باید بیشتر از دو حرف باشد" });
        }
        else {
            this.setState({ errorLName: "" });
        }
    };

    validateNumber = () => {
        const { number } = this.state;
        if (number === "") {
            this.setState({ errorNumber: " شماره تماس اجباری است" });
        } else if (number.length !== 11) {
            this.setState({ errorNumber: " شماره تماس نامعتبر است" });
        }
        else {
            this.setState({ errorNumber: "" });
        }
    };

    validateEmail = () => {
        const { email } = this.state;
        if (email === "") {
            this.setState({ errorEmail: "ایمیل اجباری است" });
        } else if (!email.includes('@')) {
            this.setState({ errorEmail: "ایمیل نامعتبر است" });
        }
        else {
            this.setState({ errorEmail: "" });
        }
    };

    componentDidMount() {
        defaultError = false;
    };

    addUser = (e) => {
        e.preventDefault();

        const { fName, lName, email, number, relation } = e.target.elements;
        const person = {
            fName: fName.value,
            lName: lName.value,
            email: email.value,
            number: number.value,
            relation: relation.value,
            id: Date.now(),
        };
        this.setState({ personInfo: [...this.state.personInfo, person] });
        this.closeFormModal();
        this.setState({ fName: '' });
        this.setState({ lName: '' });
        this.setState({ number: '' });
        this.setState({ email: '' });
        this.setState({ relation: '' });
    };

    deleteUser = (id) => {

        const newPersonInfo = this.state.personInfo.filter((item) => item.id !== id);

        this.setState({ personInfo: newPersonInfo });

    }

    openModal = (id) => {
        this.setState({ modalISOpen: true });
        this.setState({ deleteUserId: id });
        this.closeInfoModal();

    };

    modalDeleteUser = () => {
        this.setState({ delete: true });
        this.deleteUser(this.state.deleteUserId);

        this.closeModal();
    };

    closeModal = () => {
        this.setState({ modalISOpen: false });
        this.setState({ deleteUserId: '' });
    };

    // editUser = (e) => {
    //     this.setState({ editId: e.id });
    //     this.setState({ fName: e.fName });
    //     this.setState({ lName: e.lName });
    //     this.setState({ number: e.number });
    //     this.setState({ email: e.email });
    //     this.setState({ relation: e.relation });
    //     this.setState({ addBtn: 'ویرایش' });
    //     this.setState({ newUser: 'ویرایش' });
    //     this.setState({
    //         fName:e.fName,
    //         lName:e.lName,
    //         email:e.email ,
    //         number:e.number ,
    //         relation:e.relation ,
    //         id: e.id,
    //     })
    //     this.setState({toggleState:!this.state.toggleState});
    //     this.openFormModal();
    //     this.closeInfoModal();

    // };

    // handleEditUser = () => {
  
    //     const editIndex = this.state.personInfo.findIndex((el) => el = this.state.editId);
      
    //     const newPerson=[this.state.personInfo.filter(el=>el.index!==editIndex),this.state.editedUser];
      
    //     this.setState({personInfo:newPerson});
         
       
    //     this.setState({toggleState:false});
    //     this.closeFormModal();
    //     this.setState({editedUSer:''});
    //     this.setState({ addBtn: "اضافه کردن" });
    //     this.setState({ newUser: 'مخاطب جدید' });
    //     this.setState({ fName: '' });
    //     this.setState({ lName: '' });
    //     this.setState({ number: '' });
    //     this.setState({ email: '' });
    //     this.setState({ relation: '' });
    // };

    openFormModal = () => {
        this.setState({ formModalIsOpen: true })
    };

    closeFormModal = () => {
        this.setState({ formModalIsOpen: false });
        this.setState({ newUser: 'مخاطب جدید' });
        this.setState({ fName: '' });
        this.setState({ lName: '' });
        this.setState({ number: '' });
        this.setState({ email: '' });
        this.setState({ relation: '' });
    };

    openInfoModal = () => {
        this.setState({ infoModalIsOpen: true })
    };

    closeInfoModal = () => {
        this.setState({ infoModalIsOpen: false })
    };

    render() {

        const {
            lName,
            fName,
            email,
            number,
            errorName,
            errorLName,
            errorNumber,
            errorEmail,
            personInfo,
            addBtn,
            newUser,
        } = this.state;

        const isValid = errorName === "" && errorLName === "" && errorNumber === "" && errorEmail === "";

        return (
            <div className='flex justify-end lg:justify-center items-center'>
                <div className=' w-1/2  h-screen bg-blue-200 border-2 border-sky-800 rounded-md '>
                    <div className='flex justify-between  '>
                        <button onClick={this.openFormModal} className='text-6xl ml-4 mt-1 text-sky-800'>+</button>
                        <h1 className='text-2xl  mr-4 mt-4 font-bold text-sky-800'>مخاطبین</h1>
                    </div>
                    <Modal isOpen={this.state.formModalIsOpen} className='w-[400px] m-10 '>
                        <form className='container'onSubmit={(e) => this.addUser(e)} >
                            <h1 className='ml-1 mb-3 w-[273px] text-violet-900 font-bold text-xl border  text-center border-violet-900 rounded-lg'>{newUser}</h1>
                            <input
                                type="text"
                                placeholder="نام"
                                name="fName"
                                value={fName}
                                onChange={this.handelChange}
                                required
                                className='text-end my-5 w-[273px]  bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg'
                            ></input>
                            <div className='text-red-700 ml-44'>{errorName}</div>
                            <input
                                type="text"
                                placeholder="نام خانوداگی"
                                name="lName"
                                value={lName}
                                onChange={this.handelChange}
                                required
                                className='text-end my-5 w-[273px] bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg'
                            ></input>
                            <div className='text-red-700 ml-28'>{errorLName}</div>
                            <input
                                className='text-end my-5 w-[273px] bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg'
                                type="tel"
                                placeholder="شماره تماس"
                                name="number"
                                value={number}
                                onChange={this.handelChange}
                                required
                            ></input>
                            <div className='text-red-700 ml-28'>{errorNumber}</div>
                            <div>
                                <select
                                    className="text-end  my-5  w-[273px] bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg "
                                    onChange={this.handelChange}
                                    name="relation"
                                >
                                    {(this.props.relation).map((item) => (
                                        <option>{item}</option>
                                    ))}

                                </select>
                            </div>
                            <input
                                className="text-end  my-5 w-[273px]  bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg"
                                type="text"
                                placeholder="ایمیل"
                                name="email"
                                value={email}
                                onChange={this.handelChange}
                                required
                            ></input>
                            <div className='text-red-700 ml-40'>{errorEmail}</div>

                            <button
                                onClick={this.closeFormModal}
                                className='text-center my-5 mx-2 p-2 w-32 bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg'>
                                انصراف
                            </button>
                              <button
                                disabled={!isValid || defaultError}
                                
                                className='text-center my-5 mr-2 p-2 w-32 bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg'
                            > {addBtn}</button>
                            
                          
                           
                        </form>
                    </Modal>
                    <div>
                        {personInfo.map((item) => (
                            <div key={item.id} className='text-right mr-8 flex items-end justify-end' >
                                <div onClick={this.state.infoModalIsOpen ? this.closeInfoModal : this.openInfoModal} className='border border-teal-700 rounded-lg w-52 my-3 text-center bg-teal-500 text-white '>
                                    {item.fName}   {item.lName}
                                </div>
                                <Modal isOpen={this.state.infoModalIsOpen} onRequestClose={this.closeInfoModal} className='w-[300px]' >
                                    <div className='border border-teal-700 rounded-lg w-52 my-3 text-center bg-teal-500 text-white '> {item.number} </div>
                                    <div className='border border-teal-700 rounded-lg w-52 my-3 text-center bg-teal-500 text-white '> {item.email} </div>
                                    <div className='border border-teal-700 rounded-lg w-52 my-3 text-center bg-teal-500 text-white '> {item.relation} </div>
                                    <button className='border border-teal-700 bg-teal-500  mx-3 text-white text-xl rounded-lg p-2 text-center'> <FiEdit /> </button>
                                    <button onClick={() => this.openModal(item.id)} className='border border-teal-700 bg-teal-500  ml-24 text-white text-xl rounded-lg p-2 text-center'><BsTrash /></button>
                                </Modal>
                            </div>
                        ))}
                    </div>
                    <Modal isOpen={this.state.modalISOpen} className='w-[500px] p-10'>
                        <p className='text-center my-5 w-[300px]  bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg'>آیا میخواهید این مخاطب را حذف کنید؟</p>
                        <button onClick={this.closeModal} className='text-center my-5 w-[140px]  bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg'>خیر</button>
                        <button onClick={this.modalDeleteUser} className='text-center my-5 w-[140px] ml-5 bg-purple-200 rounded-xl text-purple-900 border border-purple-900 pr-3 text-lg'>بله</button>
                    </Modal>
                </div>
            </div >
        );
    }
}

export default Contact;