import React from 'react';
import CardsList from './cardsList.js'

export default class StudentsCards extends React.Component{
    state={
        searchName:'',
        searchTag:''
    }
    editSearchName=(e)=>{
        this.setState({searchName:e.target.value})
    }
    editSearchTag=(e)=>{
        this.setState({searchTag:e.target.value})
    }
    render(){
        const {students}=this.props
        const {searchName, searchTag}=this.state
        const filteredStudents=students.filter(student=>{
            const fullName=`${student.firstName} ${student.lastName}`
            return fullName.toLowerCase().indexOf(searchName.toLowerCase().trim())!==-1
        })
        return(
            <div>
                <input placeholder='Search by name' 
                style={{textAlign:'left', outline:'0', borderWidth:'0 0 2px', borderColor:'black', width:'100%', marginTop:'20px',padding:'10px', fontFamily: 'Raleway',
                fontSize :'20px'}} onChange={this.editSearchName} />
                <input placeholder='Search by tag' style={{textAlign:'left', outline:'0', borderWidth:'0 0 2px', borderColor:'black', width:'100%', marginTop:'20px',
                padding:'10px', fontFamily: 'Raleway',fontSize :'20px'}} 
                onChange={this.editSearchTag} />
                <CardsList students={filteredStudents} searchingTag={searchTag} />
            </div>            
        )
        
    }
}