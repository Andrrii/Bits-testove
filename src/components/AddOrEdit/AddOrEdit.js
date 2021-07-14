import React from 'react';
import { useLocation } from "react-router-dom"
import { useHistory } from 'react-router';
import {withRouter} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {Formik} from "formik"
import * as yup from "yup"
import 'react-lite-toast/dist/index.css'

import "./addStyle.css"
import "./buttonStyle.scss"
const notify = () => toast('Data Changed) !');

const AddOrEdit = ({saveModal,addNewBook}) => {
    const {state} = useLocation();
    const history = useHistory();
    const {id,bookDetails,addNew} = state;
    let changed = {}
    bookDetails.map(item => {
      return changed = {...item}})
    const validationSchema = yup.object().shape({
      title: yup.string().typeError("Must be a string").min(5).max(25).required("This field is required"),
      author: yup.string().typeError("Must be a string").min(5).max(25).required("This field is required"),
      language: yup.string().typeError("Must be a string").required("This field is required"),
      ISBN:yup.number().required().positive().integer().test('len', 'Must be more than 5 characters', val => val && val.toString().length > 5 ).test('len', 'Must be less than 25 characters', val => val && val.toString().length <= 25 )
    })
    return (    
      <>
          <Toaster  position="top-center"
                    gutter={8}
                    toastOptions={{
                      duration: 2000,
                      style: {
                        background: 'green',
                        color: '#fff',
                      },
                      }}
                    />
          <Formik 
            initialValues = {{
              id: changed.id,
              title:changed.title,
              author:changed.author,
              language:changed.language,
              ISBN:changed.ISBN
            }}
            validationSchema = {validationSchema}
            validateOnBlur
            onSubmit = {(values) => saveModal(values,id)}
          >
                {({values, errors, touched,handleChange,handleBlur,isValid,handleSubmit,dirty}) => 
                (
                <div className="shade">
                  <div className="blackboard">
                      <div className="form">
                      <div>
                      <p>
                        <label htmlFor = {"title"}>Book Title: </label>
                        <input 
                          type="text"
                          name = {"title"}
                          value = {values.title}
                          onChange = {handleChange}
                          onBlur = {handleBlur}
                          required
                        />
                      </p>
                      {touched.title && errors.title && <p className = {"error"}>{errors.title}</p>}
                      <p>
                        <label htmlFor = {"author"}>Author name : </label>
                        <input 
                          type="text"
                          name = {"author"}
                          value = {values.author}
                          onChange = {handleChange}
                          onBlur = {handleBlur}
                          required
                        />
                      </p>
                      {touched.author && errors.author && <p className = {"error"}>{errors.author}</p>}
                      <p>
                        <label htmlFor = {"language"}>Language: </label>
                        <select 
                          value={values.language}
                          name = {"language"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required >
                          {addNew!==true?<option value = {values.language}>{values.language}</option>
                          :<option value = "" disabled>Choose language</option>}
                          <option value = "Ukrainian">Ukrainian</option>
                          <option value = "Danish">Danish</option>
                        </select>
                      </p>
                      {touched.language && errors.language && <p className = {"error"}>{errors.language}</p>}

                      <p>
                        <label htmlFor = {"ISBN"}>ISBN: </label>
                        <input 
                          type="text"
                          name = {"ISBN"}
                          value = {values.ISBN}
                          onChange = {handleChange}
                          onBlur = {handleBlur}
                          required
                        />
                      </p>
                      {touched.ISBN && errors.ISBN && <p className = {"error"}>{errors.ISBN}</p>}


                      <p className="wipeout">
                        <button className="btn third" type="submit" disabled = {!isValid || !dirty}   onClick={() => 
                            {

                              notify()
                              addNew === true?addNewBook(values,id)
                              :
                              handleSubmit()
                              setTimeout(() => {history.push('/')},1500)
                              }} 
                        
                        >Send</button>
                        <button className="btn first" onClick={() =>history.push('/') }>Close</button>
                      </p>
                      </div>

               
            </div>
        </div>
    </div>
     )}
  </Formik>
    </>
    )

}

export default withRouter(AddOrEdit);