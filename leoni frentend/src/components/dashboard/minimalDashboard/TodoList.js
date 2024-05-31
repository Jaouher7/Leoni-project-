// import React, { useState } from 'react';
// import { ListGroup, ListGroupItem, FormGroup, Label, Input, Badge } from 'reactstrap';
// import * as Icon from 'react-feather';
// import DashCard from '../dashboardCards/DashCard';

// const TodoList = () => {
//   const [todos, setTodos] = useState([
//     {
//       id: 1,
//       content: 'Design CABLE BMW',
//       time: "2 mins ago",
//       completed: false,
//       badges: [
//         { id: 1, color: 'cyan', text: 'designer' },
//         { id: 2, color: 'primary', text: 'developer' },
//       ],
//     },
//     {
//       id: 2,
//       content: 'DESIGNE CABLE MERCEDES-BENZ',
//       time: "10 mins ago",
//       completed: false,
//       badges: [
       
//       ],
//     },
//     {
//       id: 3,
//       content: 'DesignE CABLE VW',
//       time: "12 mins ago",
//       completed: false,
//       badges: [
//         { id: 1, color: 'danger', text: 'designer' },
//         { id: 2, color: 'cyan', text: 'HR' },
//       ],
//     },
//     {
//       id: 4,
//       content: 'DESIGNE CABLE VW',
//       time: "15 mins ago",
//       completed: true,
//       badges: [
//         { id: 1, color: 'cyan', text: 'designer' },
//         { id: 2, color: 'primary', text: 'developer' },
//       ],
//     },
//     {
//       id: 5,
//       content: 'DESIGNE CABLE VW',
//       time: "6 months ago",
//       completed: false,badges: [
//         { id: 2, color: 'info', text: 'HR' },
//       ],
//     },
//     {
//       id: 6,
//       content: 'DESIGNE CABLE VW',
//       time: "1 year ago",
//       completed: false,badges: [
//         { id: 1, color: 'cyan', text: 'design' },
//         { id: 2, color: 'primary', text: 'developer' },
//       ],
//     },
//   ]);

//   const toggleComplete = (todoId) => {
//     setTodos(
//       todos.map((todo) => {
//         if (todo.id === todoId) todo.completed = !todo.completed;
//         return todo;
//       }),
//     );
//   };

//   const deleteTodo = (todoId) => {
//     setTodos(todos.filter((todo) => todo.id !== todoId));
//   };

//   return (
//     <div className="w-100">
//       <DashCard title="To do List" className="h-100">
//         <div className="todo-widget mt-3">
//           <ListGroup className="list-task todo-list list-group mb-0" data-role="tasklist">
//             {todos.map((todo) => (
//               <ListGroupItem
//                 className={`list-group-item d-flex align-items-start todo-item ps-0 border-0 ${
//                   todo.completed ? 'completed' : ''
//                 }`}
//                 key={todo.id}
//               >
//                 <FormGroup check inline>
//                   <Input
//                     type="checkbox"
//                     checked={todo.completed}
//                     id={todo.id}
//                     data-toggle="checkbox"
//                     onChange={() => toggleComplete(todo.id)}
//                   />
//                   <Label className="mb-0 d-block" htmlFor={todo.id} check>
//                     <span className="todo-desc">{todo.content}</span>
//                   </Label>
//                   <span className='text-muted fs-7 d-block mb-2'>{todo.time}</span>
//                   {todo.badges.map((badge) => (
//                     <div key={badge.id} className="d-inline-block ">
//                       <Badge color={badge.color} className="me-1">{badge.text}</Badge>
//                     </div>
//                   ))}
//                 </FormGroup>
//                 <span className="cursor-pointer ms-auto" onClick={() => deleteTodo(todo.id)}>
//                   <Icon.Trash2 className="text-muted" width={18} />
//                 </span>
//               </ListGroupItem>
//             ))}
//           </ListGroup>
//         </div>
//       </DashCard>
//     </div>
//   );
// };

// export default TodoList;
