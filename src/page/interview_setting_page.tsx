import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Interview, InterviewSetting } from "../types.ts/schems";
import { Dialog } from "@mui/material";
import InterviewSettingStoreConext from "../store/interview_setting_store_context";
import styled from "styled-components";
import {
  createInterviewSetting as createInterviewSettingService,
  fetchInterviewHistory as fetchInterviewHistoryService,
  fetchInterviewSettings as fetchInterviewSettingsService,
} from "../api/interview_setting_service";
import { useUserStore } from "../store/user_store_context";
import StartInterviewButton from "../components/buttons/start_interview_button";
import AddIcon from "@mui/icons-material/Add";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 20px;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  background-color: #2979ff;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  background-color: #2979ff;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 5px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const InterviewSettingsPage = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyType, setCompanyType] = useState("");
  const {
    interviewSettings,
    deleteInterviewSetting,
    addInterviewSetting,
    updateInterviewSetting,
    setInterviewSettings,
    fetchInterviewSettings,
    setInterviewHistory,
    setSelectdeId,
    selectedIdx,
  } = useContext(InterviewSettingStoreConext);
  const { userId, token } = useUserStore();
  const handleDialogOnClose = () => setShowModal(false);

  // useEffect(() => {
  //   const fetchInterviewSettings = async () => {
  //     const settings = await fetchInterviewSettingsService(userId, token);
  //     setInterviewSettings(settings);
  //   };
  //   fetchInterviewSettings();
  // }, []);

  console.log(interviewSettings);

  // setInterviewSettings
  const handleInitCreateSetting = () => {
    setEditMode(false);
    setTitle("");
    setJobTitle("");
    setCompanyType("");
    setShowModal(true);
  };

  const handleSaveSetting = async () => {
    if (editMode) {
      if (!selectedIdx) {
        console.log("selected id does not exist");
        return;
      }
      const setting = interviewSettings[selectedIdx];
      const newSetting: InterviewSetting = {
        id: setting.id,
        title: title,
        jobTitle: jobTitle,
        companyType: companyType,
        userId: setting.userId,
        jobLevel: setting.jobLevel,
        companyName: setting.companyName,
      };
      updateInterviewSetting(selectedIdx, newSetting);
    } else {
      // sync with server
      const setting = await createInterviewSettingService(
        userId,
        title,
        jobTitle,
        "jobLevel",
        "companyName",
        companyType,
        token
      );
      console.log("created setting", setting);
      // if (status === 200) {
      //   setShowModal(false);
      // }
      const newSetting: InterviewSetting = {
        id: setting.id,
        userId: setting.user_id,
        title: setting.title,
        jobTitle: setting.job_title,
        jobLevel: setting.job_level,
        companyName: setting.company_name,
        companyType: setting.company_type,
        createdAt: setting.created_at,
        updatedAt: setting.created_at,
      };
      addInterviewSetting(newSetting);
    }
    setShowModal(false);
  };

  const handleDeleteSetting = async (idx: number) => {
    deleteInterviewSetting(idx);
  };

  // const handleEditSetting = async (idx: number, setting: InterviewSetting) => {
  //   setSelectdeId(idx);
  //   setEditMode(true);
  //   setTitle(setting.title);
  //   setJobTitle(setting.jobTitle);
  //   setShowModal(true);
  // };

  const handleHistoryOnClick = async (idx: number) => {
    // Navigate to interview history page with the selected setting's id
    const id = String(interviewSettings[idx].id);
    const interviewHistory = await fetchInterviewHistoryService(
      userId,
      id,
      token
    );

    const convertToCamelCase = (interview: any) => {
      const { id, interview_setting_id, user_id, chats, created_at, ended_at } =
        interview;
      const camelCaseInterview = {
        id,
        interviewSettingId: interview_setting_id,
        chats,
        createdAt: created_at,
        endedAt: ended_at,
      };

      return camelCaseInterview as Interview;
    };

    console.log(interviewHistory[0]);
    const camelCaseInterviewHistory: Interview[] =
      interviewHistory?.map((interview: any) => {
        return convertToCamelCase(interview);
      }) ?? [];
    console.log(camelCaseInterviewHistory[0]);
    setInterviewHistory(camelCaseInterviewHistory);
  };

  return (
    <Container>
      <div>
        <Header>인터뷰 셋팅 목록</Header>
        <AddButton onClick={handleInitCreateSetting}>
          셋팅 생성
          <AddIcon />
        </AddButton>
      </div>
      <SettingContainer>
        {interviewSettings?.map((setting: InterviewSetting, idx) => (
          <div key={idx}>
            <ActionButton>{setting.title}</ActionButton>
            <ActionButton onClick={async () => await handleHistoryOnClick(idx)}>
              면접 기록 조회
            </ActionButton>
            {/* <ActionButton
              onClick={async () => await handleEditSetting(idx, setting)}
            >
              Edit
            </ActionButton> */}
            <StartInterviewButton idx={idx} />
            {/* <ActionButton onClick={async () => await handleDeleteSetting(idx)}>
              삭제
            </ActionButton> */}
          </div>
        ))}
        {showModal && (
          <Dialog open={showModal} onClose={handleDialogOnClose}>
            <label>
              Setting Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Job Title:
              <textarea
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </label>
            <label>
              Company Type:
              <textarea
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
              />
            </label>
            <ActionButton onClick={handleSaveSetting}>OK</ActionButton>
          </Dialog>
        )}
      </SettingContainer>
    </Container>
  );
});

export default InterviewSettingsPage;
