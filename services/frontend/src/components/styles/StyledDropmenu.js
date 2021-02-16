import styled from 'styled-components';
import device from '../../responsive/Device';

const StyledDropmenu = styled.div`
  top: ${({ showResult }) => (showResult ? '0%' : '30%')};
  position: relative;
  margin: 0 auto;
  max-width: 500px;
  transition: 0.8s 0.5s;
  @media ${device.laptopL} {
    max-width: 600px;
  }
  @media ${device.desktop} {
    max-width: 700px;
  }


  & .dd-header {
    background-color: white;
    border-color: #ccc;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;
    padding: 0 20px;

    &__title--bold {
      font-weight: bold;
    }
  }
  
  & .dd-list {
    width: 100%;
    border: none;
    background-color: #ffffff;
    font-size: 16px;
    padding: 10px 15px 10px 40px;
    color: #c5c5c5;
    transition: 0.2s;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    padding: 15px 20px 15px 45px;
    border-radius: 30px;
  }

    & li {
      list-style-type: none;

      &:first-of-type {
        > button {
          border-top: 1px solid #ccc;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
    }

      &:last-of-type > button {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    & button {
        display: flex;
        justify-content: space-between;
        background-color: white;
        font-size: 16px;
        padding: 15px 20px 15px 20px;
        border: 0;
        border-bottom: 1px solid #ccc;
        width: 100%;
        text-align: left;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;

        &:hover, &:focus {
          cursor: pointer;
          font-weight: bold;
          background-color: #ccc;
        }
    }

  }
`

export default StyledDropmenu;