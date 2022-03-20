import { FaRoad } from "react-icons/fa";
import React from "react";
import {IoWater} from 'react-icons/io5';
import {FaGripfire,FaAcquisitionsIncorporated} from 'react-icons/fa';

const btns = [
    {
      id: 1,
      title: "Жол",
      icon: <FaRoad size={30} />
    },
    {
      id: 2,
      title: "Ауыз су",
      icon: <IoWater size={30} />
    },
    {
      id: 3,
      title: "Электр",
      icon: <FaAcquisitionsIncorporated size={30} />
    },
    {
      id: 4,
      title: "Газ",
      icon: <FaGripfire size={30} />
    }
  ]

export default btns;