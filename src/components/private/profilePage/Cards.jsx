import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import api from '../../../common/axios-config';

function Cards() {
  const [info, setInfo] = useState({});
  const [mission, setMission] = useState('');
  const [onGoing, setOnGoing] = useState('');

  const getInfo = () => {
    api.get('/user').then((response) => {
      setInfo(response.data);
    });
  };

  const getMission = () => {
    api.get('/mission/successrate').then((response) => {
      setMission(response.data);
    });
  };
  const getOnGoing = () => {
    api.get('/mission/ongoing').then((response) => {
      setOnGoing(response.data);
    });
  };

  useEffect(() => {
    getInfo();
    getMission();
    getOnGoing();
  }, []);

  return (
    <CardContainer>
      <Card>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">내 미션 점수</div>
          <p>{info.missionScore}</p>
        </div>
      </Card>
      <Card>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">내 미션 수행률</div>
          <p>{mission}</p>
        </div>
      </Card>
      <Card>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">오늘의 미션</div>
          {onGoing && onGoing.map((one) => (
            <div key={one.id}>
              <div>
                {one.assignment}
              </div>
              <div>
                {one.startAt}
              </div>
              <div>
                {one.endAt}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </CardContainer>

  );
}

const CardContainer = tw.div`
    p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5
    `;
const Card = tw.div`
    rounded overflow-hidden shadow-lg
`;
export default Cards;
