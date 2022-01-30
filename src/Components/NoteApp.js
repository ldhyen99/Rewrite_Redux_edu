import * as React from 'react';

export const NoteEditor = ({ note, onChangeNote, onCloseNote }) => (
  <div>
    <div>
      <textarea
        className="editor-content"
        autoFocus
        value={note.content}
        onChange={(event) => onChangeNote(note.id, event.target.value)}
      />
    </div>
    <button className="editor-button" onClick={onCloseNote}>
      Close
    </button>
  </div>
);

export const NoteTitle = ({ note }) => {
  const title = note.content.split('\n')[0].replace(/^\s+|\s+$/g, '');
  if (title === '') {
    return <i>Untitled</i>;
  }
  return <span>{title}</span>;
};

export const NoteLink = ({ note, onOpenNote }) => (
  <li className="note-list-item">
    <a href="#edit" onClick={() => onOpenNote(note.id)}>
      <NoteTitle note={note} />
    </a>
  </li>
);

export const NoteList = ({ notes, onOpenNote }) => (
  <ul className="note-list">
    {Object.keys(notes).map((id) => (
      <NoteLink key={id} note={notes[id]} onOpenNote={onOpenNote} />
    ))}
  </ul>
);

export const NoteApp = ({
  notes,
  openNoteId,
  onAddNote,
  onChangeNote,
  onOpenNote,
  onCloseNote,
}) => (
  <div>
    {openNoteId ? (
      <NoteEditor
        note={notes[openNoteId]}
        onChangeNote={onChangeNote}
        onCloseNote={onCloseNote}
      />
    ) : (
      <div>
        <NoteList notes={notes} onOpenNote={onOpenNote} />
        {
          <button className="editor-button" onClick={onAddNote}>
            New Note
          </button>
        }
      </div>
    )}
  </div>
);
