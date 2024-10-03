// MissionSlider.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";
import { Pagination } from "swiper/modules";
import Button from "../Button";
import Block from "../Block";

interface Mission {
  id: number;
  name: string;
  description: string;
  link: string;
}

const missionsData: Mission[] = [
  {
    id: 1,
    name: "Mission 1",
    description: "Description of mission 1",
    link: "https://example.com/mission1",
  },
  {
    id: 2,
    name: "Mission 2",
    description: "Description of mission 2",
    link: "https://example.com/mission2",
  },
  // { id: 3, name: 'Mission 3', description: 'Description of mission 3', link: 'https://example.com/mission3' },
];

const MissionSlider: React.FC = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={15}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {missionsData.map((mission) => (
        <SwiperSlide key={mission.id}>
          <div className="mission-slide">
            <h3 className="mission-name">{mission.name}</h3>
            <p className="mission-description">{mission.description}</p>
            <Block className="swiper-mission-btn">
              <Button>Follow</Button>
            </Block>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MissionSlider;
