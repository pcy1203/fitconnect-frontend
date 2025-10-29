// import React from "react";
// import styled from "styled-components";

// const Wrapper = styled.div`
//   width: 320px;
//   height: 320px;
//   position: relative;
// `;

// const SVG = styled.svg`
//   width: 100%;
//   height: 100%;
// `;

// const Label = styled.text`
//   font-size: 12px;
//   fill: #111;
//   text-anchor: middle;
// `;

// const Hexagon = ({ 값 = [80, 65, 90, 75, 85, 70] }) => {
//   const labels = [
//     "역할 수행력",
//     "역량 적합도",
//     "성장 가능성",
//     "커리어 방향",
//     "협업 기여도",
//     "컬처 핏",
//   ];

//   const groups = [
//     { name: "직무 적합성", color: "rgba(34, 197, 94,0.1)", indices: [0, 1] },
//     { name: "성장 가능성", color: "rgba(59, 130, 246,0.1)", indices: [2, 3] },
//     { name: "Culture Fit", color: "rgba(234, 179, 8,0.1)", indices: [4, 5] },
//   ];

//   const size = 140; // 중심에서 꼭짓점까지 거리
//   const cx = 160;
//   const cy = 160;

//   // 육각형 각도 (선분이 위로)
//   const angleStep = (Math.PI * 2) / 6;
//   const startAngle = Math.PI / 6; // 변이 위로 향하도록 회전

//   const getPoint = (index, scale = 1) => {
//     const angle = startAngle + angleStep * index;
//     const x = cx + Math.cos(angle) * size * scale;
//     const y = cy + Math.sin(angle) * size * scale;
//     return { x, y };
//   };

//   const dataPolygon = 값
//     .map((v, i) => {
//       const p = getPoint(i, v / 100);
//       return `${p.x},${p.y}`;
//     })
//     .join(" ");

//   return (
//     <Wrapper>
//       <SVG viewBox="0 0 320 320">
//         {/* 그룹별 배경 */}
//         {groups.map((g, idx) => {
//           const pts = g.indices.map((i) => getPoint(i));
//           // 두 축 연결된 사각형 배경 (간단하게 다각형)
//           return (
//             <polygon
//               key={idx}
//               points={pts
//                 .map((p) => `${p.x},${p.y}`)
//                 .concat(`${cx},${cy}`) // 중앙 포함
//                 .join(" ")}
//               fill={g.color}
//             />
//           );
//         })}

//         {/* 육각형 외곽 */}
//         <polygon
//           points={Array.from({ length: 6 })
//             .map((_, i) => {
//               const p = getPoint(i);
//               return `${p.x},${p.y}`;
//             })
//             .join(" ")}
//           stroke="#999"
//           fill="transparent"
//           strokeWidth="2"
//         />

//         {/* 데이터 영역 */}
//         <polygon
//           points={dataPolygon}
//           fill="rgba(82, 123, 255, 0.4)"
//           stroke="#527bff"
//           strokeWidth="2"
//         />

//         {/* 꼭짓점 점 */}
//         {Array.from({ length: 6 }).map((_, i) => {
//           const p = getPoint(i, 값[i] / 100);
//           return <circle key={i} cx={p.x} cy={p.y} r={5} fill="#527bff" />;
//         })}

//         {/* 라벨 */}
//         {labels.map((label, i) => {
//           const p = getPoint(i, 1.15); // 중앙에서 조금 떨어뜨림
//           return (
//             <Label key={i} x={p.x} y={p.y}>
//               {label}
//             </Label>
//           );
//         })}
//       </SVG>
//     </Wrapper>
//   );
// };

// export default Hexagon;


import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 320px;
  height: 280px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const Label = styled.text`
  fill: #555;
  font-size: 12px;
  text-anchor: middle;
`;

const Hexagon = ({ score = [0, 0, 0, 0, 0, 0], role = "talent" }) => {
  const labels = (role === "company") ? ["역할 수행력", "성장 가능성", "커리어 방향", "조직/문화 적합도", "협업 기여도", "역량 적합도"]
    : ["역할 적합도", "성장 기회 제공", "커리어 방향", "조직/문화 적합도", "비전 신뢰도", "역량 적합도"];

  const maxRadius = 100;
  const angleStep = (Math.PI * 2) / 6;

  const getPoint = (index, scale = 1) => {
    const angle = angleStep * index - Math.PI / 2;
    const x = 140 + Math.cos(angle) * maxRadius * scale;
    const y = 140 + Math.sin(angle) * maxRadius * scale;
    return `${x},${y}`;
  };

  const basePolygon = Array.from({ length: 6 })
    .map((_, i) => getPoint(i))
    .join(" ");
  const dataPolygon = score.map((v, i) => getPoint(i, v / 100)).join(" ");

  return (
    <Wrapper>
      <SVG viewBox="0 0 280 280">
        {[0.25, 0.5, 0.75, 1].map((s, idx) => (
          <polygon
            key={idx}
            points={Array.from({ length: 6 })
              .map((_, i) => getPoint(i, s))
              .join(" ")}
            fill="none"
            stroke={s == 1 ? (role === "company" ? "#87B2FF" : "#ff8787ff") : "#ddd"}
            strokeWidth={s == 1 ? "3" : "1"}
          />
        ))}

        <polygon
          points={dataPolygon}
          fill={role === "company" ? "rgba(82, 123, 255, 0.4)" : "rgba(255, 82, 82, 0.4)"}
          stroke={role === "company" ? "#527bff" : "#ff5852ff"}
          strokeWidth="2"
        />
        
        {score.map((v, i) => {
          const coords = getPoint(i, v / 100).split(",").map(Number);
          const angle = angleStep * i - Math.PI / 2;
          const textX = 140 + Math.cos(angle) * (maxRadius * (v / 100) - 25);
          const textY = 140 + Math.sin(angle) * (maxRadius * (v / 100) - 25);
          return (
            <g key={i}>
              <circle cx={coords[0]} cy={coords[1]} r={3} fill={role === "company" ? "#527bff" : "#ff5852ff"}/>
              {/* <circle cx={textX} cy={textY - 4} r={12} fill="rgba(255, 255, 255, 0.9)"/> */}
              <text x={textX} y={textY} fontSize="9" textAnchor="middle" fill="#333" fontWeight="600">
              {v}%
            </text>
          </g>
          );
        })}
        {/* return <circle key={i} cx={coords[0]} cy={coords[1]} r={3} fill={role === "company" ? "#527bff" : "#ff5852ff"}/>; */}


        {labels.map((label, i) => {
          const angle = angleStep * i - Math.PI / 2;
          const x = 140 + Math.cos(angle) * (maxRadius + 45);
          const y = 145 + Math.sin(angle) * (maxRadius + 20);
          return (
            <Label key={i} x={x} y={y}>
              {label}
            </Label>
          );
        })}
      </SVG>
    </Wrapper>
  );
};

export default Hexagon;