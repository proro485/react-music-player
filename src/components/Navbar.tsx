import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
  setIsLibraryVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({ setIsLibraryVisible }) => {
  return (
    <div className="navbar">
      <h1>React Music Player</h1>
      <div className="library-button">
        <button onClick={() => setIsLibraryVisible((prevState) => !prevState)}>
          <div>
            <FontAwesomeIcon icon={faMusic} />
            <span>Library</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
