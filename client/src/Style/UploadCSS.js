import styled from '@emotion/styled'

const UploadDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
  input{
      border-radius : 10px;
      border : 1px solid #c6c6c6;
      &:actice, & focus{
          outline:none;
      }
      padding:10px;
  }
  textarea {
    min-height: 400px;
    resize: none;
    border-radius : 10px;
    border : 1px solid #c6c6c6;
    &:actice, & focus{
        outline:none;
    }
    &::-webkit-scrollbar{
        width:10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: grey;
        border-radius:15px;
        background-colip:padding-box;
        border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track{
        background-color: #c6c6c6;
        border-radius:15px;
        box-shadow: inset 0px 0px 5px whitesmoke;
    }
label{
    font-weight: bold;
    margin-top:10px;
}
`

const UploadButtonDiv = styled.div`
margin-top: 1rem;
display: flex;
justify-content: flex-end;
  button{
    border-radius:15px;
    padding:5px 10px;
    background-color:black;
    color:white;
    border: 1px solid black;
    &:hover{
        background-color:white;
        color:black;
        border: 1px solid black;
    }
    &.cancel{
        margin-right:10px;
        background-color:white;
        color:black;
        border: 1px solid black;
        &:hover{
            background-color:black;
            color:white;
            border: 1px solid black;
        }
    }
  }
`

export { UploadDiv, UploadForm, UploadButtonDiv } 