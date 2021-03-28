import React from 'react';
import StudentdCards from './studentsCards.js'

export default class FetchData extends React.Component{
    state={
        loading:true,
        students:null
    }
    async componentDidMount(){
            const url="https://api.hatchways.io/assessment/students"
            const response=await fetch(url)
            const data=await response.json()
            this.setState({students:data.students, loading: false})
    }
    render(){
        const {loading, students}=this.state
        return (
            <div>
                {loading?<div>loading...</div>:<StudentdCards students={students}/>}
            </div>
        )
    }
}