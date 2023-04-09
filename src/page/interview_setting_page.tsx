import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Interview, InterviewSetting} from "../types.ts/schems";
import {Dialog} from "@mui/material";
import InterviewSettingStoreConext from "../store/interview_setting_store_context";
import styled from "styled-components";
import {
  createInterviewSetting as createInterviewSettingService,
  fetchInterviewHistory as fetchInterviewHistoryService,
  fetchInterviewSettings as fetchInterviewSettingsService,
} from "../api/interview_setting_service";
import {useUserStore} from "../store/user_store_context";
import StartInterviewButton from "../components/buttons/start_interview_button";
import AddIcon from "@mui/icons-material/Add";

const Container = styled.div`
`;

const Header = styled.h1`
  display: flex;
  font-size: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #2979ff;
  border-radius: 5px;
  border: none;
  color: white;
  padding: 5px 10px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #1854a5;
  }

  &:active {
    background-color: #0b2c4d;
  }
`;

const SettingRow = styled.div`
  padding: 5px;
  display: flex;
  gap: 7px;
  flex-direction: row;
  justify-content: space-between;
`

const SettingRowTitle = styled.div`
  text-align: left !important;
  max-width: 150px;
`

const SettingRowBody = styled.div`
  padding: 5px;
  display: flex;
  gap: 7px;
  max-height: 30px;
`

const AddButton = styled.button`
  display: flex;
  background-color: #2979ff;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const SettingContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 10px;
  min-height: max-content;
`;

const ActionButton = styled.button`
  border: none;
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

const ModalRow = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
`

const ModalRowTitle = styled.div`
  font-size: 15px;
  margin-right: 10px;
`

const ModalRowInput = styled.div`
`

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
  const {userId, token} = useUserStore();
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
      const {id, interview_setting_id, user_id, chats, created_at, ended_at} =
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
      <Header>
        인터뷰 셋팅 목록
        <AddButton onClick={handleInitCreateSetting}>
          <AddIcon/>
          셋팅 생성
        </AddButton>
      </Header>
      <SettingContainer>
        {interviewSettings?.map((setting: InterviewSetting, idx) => (
          <SettingRow key={idx}>
            <SettingRowTitle>
              {setting.title}
            </SettingRowTitle>
            <SettingRowBody>
              <Button onClick={async () => await handleHistoryOnClick(idx)}>
                면접 기록 조회
              </Button>
              <StartInterviewButton idx={idx}/>
            </SettingRowBody>
          </SettingRow>
        ))}
        {showModal && (
          <Dialog open={showModal} onClose={handleDialogOnClose}>
            <ModalRow>
              <ModalRowTitle>
                셋팅 제목:
              </ModalRowTitle>
              <ModalRowInput>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </ModalRowInput>
            </ModalRow>
            <ModalRow>
              <ModalRowTitle>
                직무 설명:
              </ModalRowTitle>
              <ModalRowInput>
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </ModalRowInput>
            </ModalRow>
            <ModalRow>
              <ModalRowTitle>
                지원회사 설명:
              </ModalRowTitle>
              <ModalRowInput>
                <input
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                />
              </ModalRowInput>
            </ModalRow>
            <ActionButton onClick={handleSaveSetting}>OK</ActionButton>
          </Dialog>
        )}
      </SettingContainer>
    </Container>
  );
});

export default InterviewSettingsPage;
