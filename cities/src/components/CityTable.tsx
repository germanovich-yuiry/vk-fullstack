import { FC, useEffect, useRef, useState } from "preact/compat";
import { City } from "../types/CityDTO";

import styled from "styled-components";

import { Table } from "antd";

import { observer } from "mobx-react-lite";

const StyledTable = styled(Table)`
  width: 100%;
  .highlight {
    background-color: yellow;
  }
`;

interface CityTableProps {
  cities: City[];
  searchText: string;
}

const CityTable: FC<CityTableProps> = ({ cities, searchText }) => {
  const [visibleCities, setVisibleCities] = useState<City[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const highlightText = (text: string) => {
    if (!text || !searchText) return text;

    const parts = text.split(new RegExp(`(${searchText})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "title",
      render: highlightText,
    },
    {
      title: "Регион",
      dataIndex: "region",
      render: highlightText,
    },
    {
      title: "Область",
      dataIndex: "area",
      render: highlightText,
    },
  ];

  useEffect(() => {
    setVisibleCities(cities.slice(0, 10));
  }, [cities]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && startIndex < cities.length) {
        const nextIndex = startIndex + 10;
        setVisibleCities((prev) => [
          ...prev,
          ...cities.slice(startIndex, nextIndex),
        ]);
        setStartIndex(nextIndex);
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, cities, startIndex]);

  return (
    <>
      <StyledTable
        dataSource={visibleCities}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <div
        ref={loadMoreRef}
        style={{ height: "20px", backgroundColor: "transparent" }}
      />
    </>
  );
};

export default observer(CityTable);
