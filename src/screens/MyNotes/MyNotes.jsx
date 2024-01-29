import React, { useEffect, useState } from 'react';
import Mainscree from '../../components/Mainscree';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listNotes, deleteNoteAction } from '../../actions/notesAction';

const MyNotes = ({search}) => {
  const dispatch = useDispatch();
  const naviagate = useNavigate()
  const noteList = useSelector((state) => state.noteList);
  const { notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ?')) {
      // Add logic to delete the note
      dispatch(deleteNoteAction(id));
      naviagate('/mynotes')
      window.location.href = '/mynotes'
    }
  };

  useEffect(() => {
    dispatch(listNotes());
  }, [dispatch, successCreate]);

  return (
    <Mainscree title={`Welcome Back ${userInfo.name}`}>
      <NavLink to={'/createnote'}>
        <button className='btn btn-secondary'>Create New Note</button>
      </NavLink>
      {notes &&
        notes.reverse().filter((filteredNote) => 
          filteredNote.title.toLowerCase().includes((search ??'').toLowerCase())).map((note, index) => (
          <div className='card mt-2' key={note._id}>
            <div className='card-header accordion-header' id={`heading${note._id}`}>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={`#collapse${note._id}`}
                  aria-expanded='true'
                  aria-controls={`collapse${note._id}`}
                >
                  {note.title}
                </button>
                <span className='float-end'>
                  <NavLink to={`/note/${note._id}`}>
                    <button className='btn btn-success me-3'>Edit</button>
                  </NavLink>
                  <button className='btn btn-danger' onClick={() => deleteHandler(note._id)}>
                    Delete
                  </button>
                </span>
              </h2>
            </div>
            <div
              id={`collapse${note._id}`}
              className='accordion-collapse collapse show'
              aria-labelledby={`heading${note._id}`}
              data-bs-parent='#accordionExample'
            >
              <div className='card-body'>
                <button type='button' className='btn btn-primary'>
                  Category - {note.category}
                </button>
                <blockquote className='blockquote mb-0'>
                  <p>{note.content}</p>
                  <footer className='blockquote-footer'>
                    Created on{' '}
                    <cite title='Source Title'>{note.createdAt.substring(0, 10)}</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        ))}
    </Mainscree>
  );
};

export default MyNotes;
