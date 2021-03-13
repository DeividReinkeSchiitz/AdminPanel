import React from "react";

import { ImageContainer, Image, Container } from "./styles";
import Empty from "../../assets/image/empty.svg";
const Home: React.FC = () => {
  return (
    <Container>
      <ImageContainer>
        <Image src={Empty} />
      </ImageContainer>
    </Container>
  );
};

export default Home;
