import styled from 'styled-components';
import FadeIn from './FadeIn';

const ForecastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${FadeIn} 0.5s 1.4s forwards;
`;

export default ForecastContainer;