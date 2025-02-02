import React, { useState } from "react";
import ScrapFolder from "./ScrapFolder";
import "./ScrapList.css";
import { IconSwitch } from "assets/export";

const dummyFolder = {
  folderId: 1,
  folderName: "기본 폴더",
  lastModifiedAt: "2024-08-04 05:17",
  createdDate: new Date("2024-08-04 05:17"),
  items: ["Item 1", "Item 2", "Item 3"],
};

interface ScrapData {
  createdDate: Date;
  items: string[];
}

interface ScrapListProps {
  selectedFolder: string;
  onFolderSelect: (folder: string) => void;
  scraps: { [key: string]: ScrapData };
}

const ScrapList: React.FC<ScrapListProps> = ({
  selectedFolder,
  onFolderSelect,
  scraps,
}) => {
  const [sortBy, setSortBy] = useState<"이름 순" | "날짜 순">("이름 순");

  // Adding dummy folder to scraps
  const initialScraps = {
    [dummyFolder.folderName]: {
      createdDate: dummyFolder.createdDate,
      items: dummyFolder.items,
    },
    ...scraps,
  };

  const sortedFolders = Object.keys(initialScraps).sort((a, b) => {
    if (sortBy === "이름 순") {
      return a.localeCompare(b);
    } else if (sortBy === "날짜 순") {
      return (
        initialScraps[b].createdDate.getTime() -
        initialScraps[a].createdDate.getTime()
      );
    }
    return 0;
  });

  return (
    <div>
      <IconSwitch style={{ position: "absolute", width: 180 }} />
      <div className="sortSwitch">
        <button
          className={`sortButton ${sortBy === "이름 순" ? "active" : ""}`}
          onClick={() => setSortBy("이름 순")}
        >
          이름 순
        </button>
        <button
          className={`sortButton ${sortBy === "날짜 순" ? "active" : ""}`}
          onClick={() => setSortBy("날짜 순")}
        >
          날짜 순
        </button>
      </div>
      <br />
      <select
        value={selectedFolder}
        onChange={(e) => onFolderSelect(e.target.value)}
        className="folderSelect"
      >
        <option value="">모든 폴더 보기</option>
        {sortedFolders.map((folder) => (
          <option key={folder} value={folder}>
            {folder}
          </option>
        ))}
      </select>
      {selectedFolder ? (
        <ScrapFolder
          folder={selectedFolder}
          createdDate={initialScraps[selectedFolder]?.createdDate}
        />
      ) : (
        <div className="grid-container">
          {sortedFolders.map((folder) => (
            <div key={folder} className="grid-item">
              <ScrapFolder
                folder={folder}
                createdDate={initialScraps[folder].createdDate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrapList;
