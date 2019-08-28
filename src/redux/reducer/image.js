const initState = {
  image: '',
  filename: '',
  imgUrl: '',
  isUploading: false,
  err: '',
  uploadSuccess: false
};

const image = (state = initState, action) => {
  switch(action.type) {
    case 'UPLOAD_IMAGE_START':
      return {
        ...state,
        isUploading: true,
        uploadSuccess: false
      };
    case 'UPLOAD_IMAGE_SUCCESS':
      return {
        ...state,
        isUploading: false,
        image: action.image,
        filename: action.filename,
        imgUrl: action.imgUrl,
        err: '',
        uploadSuccess: true
      };
    case 'UPLOAD_IMAGE_FAIL':
      return {
        ...state,
        isUploading: false,
        err: action.err,
        uploadSuccess: false
      };
    case "RESET_IMAGE":
      return {
        image: '',
        filename: '',
        imgUrl: '',
        isUploading: false,
        err: '',
        uploadSuccess: false
      }
    default:
      return state;
  }
  
};

export default image;