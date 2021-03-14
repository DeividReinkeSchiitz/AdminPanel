import React from "react";
import Empty from "../../assets/image/empty.svg";
import { Container, Image, ImageContainer } from "./styles";

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
