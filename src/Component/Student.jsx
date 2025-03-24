import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStudent, editStudent, deleteStudent } from "../Features/studentSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TablePagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Student.css";

const Student = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.Students.students);

  const [studentData, setStudentData] = useState({
    name: "",
    course: "",
    age: "",
    Batch: "",
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editingStudent) {
        dispatch(editStudent({ ...studentData, id: editingStudent.id }));
        setEditingStudent(null);
      } else {
        dispatch(addStudent(studentData));
      }
      setStudentData({ name: "", course: "", age: "", Batch: "" });
      setShowForm(false);
    }
  };

  const validateForm = () => {
    if (studentData.age <= 0) {
      alert("Age must be a positive number.");
      return false;
    }
    if (new Date(studentData.Batch).getTime() > new Date().getTime()) {
      alert("Batch cannot be in the future.");
      return false;
    }
    return true;
  };

  const handleEdit = (student) => {
    setStudentData(student);
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setStudentToDelete(id);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteStudent(studentToDelete));
    setConfirmDelete(false);
    setStudentToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setStudentToDelete(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.Batch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [sortOrder, setSortOrder] = useState({ column: "name", direction: "asc" });

  const handleSort = (column) => {
    const isAsc = sortOrder.column === column && sortOrder.direction === "asc";
    setSortOrder({ column, direction: isAsc ? "desc" : "asc" });
  };

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aValue = a[sortOrder.column];
    const bValue = b[sortOrder.column];
    if (aValue < bValue) return sortOrder.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder.direction === "asc" ? 1 : -1;
    return 0;
  });

  const currentPageStudents = sortedStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
     <Typography variant="h4" align="center" gutterBottom>
        🎓 Student Management System
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
        Add Student
      </Button>

      <TextField
        label="Search Students"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        style={{ marginTop: "20px" }}
      />

      <Dialog fullScreen open={showForm} onClose={() => setShowForm(false)}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setShowForm(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              {editingStudent ? "Edit Student" : "Add Student"}
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={handleSubmit} style={{ padding: "20px", width: 700 }} className="form-container">
          <TextField
            label="Name"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Course"
            name="course"
            value={studentData.course}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            type="number"
            name="age"
            value={studentData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="Batch"
            type="month"
            value={studentData.Batch}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
            {editingStudent ? "Update Student" : "Add Student"}
          </Button>
        </form>
      </Dialog>

      <TableContainer component={Paper} style={{ maxWidth: 900, margin: "auto", marginTop: "40px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                <strong>Name</strong>
                {sortOrder.column === "name" && (sortOrder.direction === "asc" ? " ↑" : " ↓")}
              </TableCell>
              <TableCell onClick={() => handleSort("age")} align="right" style={{ cursor: "pointer" }}>
                <strong>Age</strong>
                {sortOrder.column === "age" && (sortOrder.direction === "asc" ? " ↑" : " ↓")}
              </TableCell>
              <TableCell onClick={() => handleSort("course")} align="right" style={{ cursor: "pointer" }}>
                <strong>Course</strong>
                {sortOrder.column === "course" && (sortOrder.direction === "asc" ? " ↑" : " ↓")}
              </TableCell>
              <TableCell onClick={() => handleSort("Batch")} align="right" style={{ cursor: "pointer" }}>
                <strong>Batch</strong>
                {sortOrder.column === "Batch" && (sortOrder.direction === "asc" ? " ↑" : " ↓")}
              </TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageStudents.length > 0 ? (
              currentPageStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell align="right">{student.age}</TableCell>
                  <TableCell align="right">{student.course}</TableCell>
                  <TableCell align="right">{student.Batch}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(student)}
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No students available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog open={confirmDelete} onClose={handleCancelDelete}>
        <Typography style={{ padding: "20px" }}>
          Are you sure you want to delete this student?
        </Typography>
        <Button onClick={handleCancelDelete} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} variant="contained" color="primary" style={{ marginLeft: "10px" }}>
          Confirm
        </Button>
      </Dialog>
    </>
  );
};

export default Student;
