import { 
    Typography, 
    Box, 
    makeStyles,   
TableContainer, 
Table, 
TableBody, 
TableCell, 
TableHead, 
TableRow, 
Paper, 
IconButton,
Tooltip,

} from "@material-ui/core"
import { orange} from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const useStyles = makeStyles({
    tableHeadCell: {
     color: "white",
     fontWeight: "bold",
     fontSize: 16
    },
       stuListColor: {
        backgroundColor: orange[400],
        color: "white"
       },
   })
const List = () => {
    const classes = useStyles(); 
    const [students, setStudents]= useState([]);
    useEffect(()=>{
        async function getAllStudents(){
            try{
                const students = await axios.get("http://localhost:3333/students")
                setStudents(students.data);
            }
            catch(error){
                console.log(error)
            }
        }
        getAllStudents();

    },[])

    const handleDelete = async id => {
        await axios.delete(`http://localhost:3333/students/${id}`);
        var newstudent = students.filter((item) => {
         // console.log(item);
         return item.id !== id;
        })
        setStudents(newstudent);
       }
    
  return (
    <>
    <Box textAlign="center" p={2} className={classes.stuListColor} mb={2}>
                <Typography variant='h4'>Student List</Typography>
            </Box>

            <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
        {
        students.map((student, i) => {
            return (
            <TableRow key={i} >
            <TableCell align="center">{1+i}</TableCell>
            <TableCell align="center">{student.stuname}</TableCell>
            <TableCell align="center">{student.email}</TableCell>
            <TableCell align="center">
             <Tooltip title="View">
              <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
             </Tooltip>
             <Tooltip title="Edit">
              <IconButton><Link to={`/edit/${student.id}`}><EditIcon /></Link></IconButton>
             </Tooltip>
             <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(student.id)}> <DeleteIcon color="secondary" /></IconButton>
             </Tooltip>
            </TableCell>
           </TableRow>
            )

        })}
         
    

     </TableBody>
    </Table>
   </TableContainer>
   </>
  )
}

export default List
