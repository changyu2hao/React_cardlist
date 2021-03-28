import React from 'react';

export default class CardsList extends React.Component{
    state={
        tag:null,
        tagsObj:{},
        changeTagId:null,
        filteredStudents:this.props.students,
        clickedObjIds:{}
    }
    componentDidUpdate=(prevProps)=>{
        if(this.state.tagsObj!=={}&&prevProps.searchingTag!==this.props.searchingTag||this.props.students!==prevProps.students){
            let tagsFilterStudents=[]
            if(this.props.searchingTag&&this.props.searchingTag.trim()!==''){
                this.props.students.map(student=>{
                    const studentId=student.id
                    this.state.tagsObj[studentId]&&this.state.tagsObj[studentId].every(item=>{
                        if(item.toLowerCase().includes(this.props.searchingTag.toLowerCase().trim())){
                            tagsFilterStudents.push(student)
                            return false
                        }
                        return true
                    })
                })
            }else{
                tagsFilterStudents=this.props.students
            }
            this.setState({
                filteredStudents:tagsFilterStudents
            })
        } 
    }
    showDetails=(id)=>{
        const {clickedObjIds}=this.state
        let clickedIds=[]
        let clickedObjIdsTemp=clickedObjIds
        for(const property in clickedObjIdsTemp){
            if(property===id){
                clickedObjIdsTemp[property]=!clickedObjIdsTemp[property]
            }
            clickedIds.push(property)
        }
        if(clickedIds.indexOf(id)===-1){
            clickedObjIdsTemp[id]=true
        }
        this.setState({
            clickedObjIds:clickedObjIdsTemp
        })
    }
    addTag=(id)=>{
        const {tagsObj, tag}=this.state
        if(tagsObj[id]){
            let obj=tagsObj
            let arr=tagsObj[id]
            arr.push(tag)
            obj[id]=arr
            this.setState({
                tagsObj:obj,
                tag:''
            })
        }else{
            let obj=tagsObj
            obj[id]=[tag]
            this.setState({
                tagsObj:obj,
                tag:''
            })
        }
    }
    changeTag=(e,id)=>{
        this.setState({
            tag:e.target.value,
            changeTagId:id
        })
    }
    render(){
        const fontStyle={
            fontFamily: 'Raleway',
            fontSize :'20px'
        }
        const {filteredStudents, clickedObjIds, tagsObj, changeTagId, tag}=this.state
        return(
            <div>
                {       
                filteredStudents.map((student)=>{
                    let sum=0
                    let i=0
                    student.grades.forEach(grade=>{
                        sum+=parseInt(grade,10)
                    })
                    const average=sum/student.grades.length
                    const studentId=student.id
                    return(
                        <div style={{display:'flex', justifyContent :'space-between',margin:'20px'}} key={studentId}>
                            <div style={{display:'flex', justifyContent :'space-between'}}>
                                <img src={student.pic} alt={`${student.firstName} ${student.lastName}`} style={{width:'100px',height:'100px', borderRadius:'50%', border:'1px solid grey', marginRight:'15px', marginTop:'15px'}}></img>
                                <div>
                                    <h1>{student.firstName} {student.lastName}</h1>
                                    <div style={fontStyle}>Email: {student.email}</div>
                                    <div style={fontStyle}>company: {student.company}</div>
                                    <div style={fontStyle}>skill: {student.skill}</div>
                                    <div style={fontStyle}>average: {average}</div>
                                    {clickedObjIds[studentId]&&
                                        student.grades.map(grade=>{
                                            i++
                                            return(
                                                <div style={fontStyle} key={i}>Test{i}:&nbsp;&nbsp;&nbsp;{grade}</div>
                                            )
                                        })
                                    }
                                    <div style={{display:'flex', alignContent:'flex-start', flexWrap:'wrap'}}>
                                        {tagsObj[studentId]&&tagsObj[studentId].map(tag=>{
                                            return(
                                                <div key={tag} style={{backgroundColor:'#d8dce3',marginTop:'10px', marginRight:'10px', padding:'5px', borderRadius:'10px'}}>{tag}</div>
                                            )
                                        })}
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <input value={changeTagId===studentId?tag:''} 
                                        placeholder='Add a tag' style={{outline:'0', borderWidth:'0 0 2px', borderColor:'grey'}} 
                                        onKeyPress={(event)=>{if(event.key==='Enter'){this.addTag(studentId)}}} 
                                        onChange={(e)=>this.changeTag(e,studentId)} />
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop:'15px'}} onClick={()=>this.showDetails(studentId)}>
                                {clickedObjIds[studentId]?
                                <span style={{fontSize:'50px', fontWeight:'bold',color:'grey'}}>&#8722;</span>
                                :<span style={{color:'grey', fontSize:'50px', fontWeight:'bold'}}>&#43;</span>
                                }
                            </div>
                        </div>                
                    )
                })}
            </div>
        )
    }
}