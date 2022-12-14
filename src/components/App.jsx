import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  const [search, setSearch] = useState('');
  const [image, setImage] = useState('');

  const handlerForm = search => {
    setSearch(search);
  };

  const handlerOpenModal = image => {
    setImage(image);
  };

  const handlerCloseModal = () => {
    setImage('');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr0',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handlerForm} />

      <ImageGallery search={search} handlerOpenModal={handlerOpenModal} />
      {image && <Modal image={image} onClose={handlerCloseModal} />}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

// import { Component } from 'react';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Modal } from './Modal/Modal';
// import { Searchbar } from './Searchbar/Searchbar';
// import { ToastContainer } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';
// export class App extends Component {
//   state = {
//     search: '',
//     image: '',
//   };

//   handlerForm = search => {
//     this.setState({ search });
//   };

//   handlerOpenModal = image => {
//     this.setState({ image: image });
//   };

//   handlerCloseModal = () => {
//     this.setState({ image: '' });
//   };

//   render() {
//     const { search, image } = this.state;
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr0',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         <Searchbar onSubmit={this.handlerForm} />

//         <ImageGallery
//           search={search}
//           handlerOpenModal={this.handlerOpenModal}
//         />
//         {image && <Modal image={image} onClose={this.handlerCloseModal} />}
//         <ToastContainer autoClose={1500} />
//       </div>
//     );
//   }
// }
