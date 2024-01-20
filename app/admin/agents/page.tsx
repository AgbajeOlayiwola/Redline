"use client"
import PrimartButton from "@/component/Buttons/PrimaryButton"
import OutlineButton from "@/component/Buttons/outline_button"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import Cover from "@/component/Layout/cover"
import Modal from "@/component/Layout/modal"
import PrimarySelect from "@/component/Layout/primary_select"
import Table from "@/component/Layout/table"
import CustomDropdown from "@/component/reusable_compoenent/custome_dropdown"
import {
  useDeletOrganisationUserMutation,
  useGetOrganizationUsersMutation,
  useInviteMemberOrganizationMutation,
  useUpdateOrganisationUserMutation,
} from "@/redux/api/mutationApi"
import { clearEditAgent } from "@/redux/slices/edit-agent-slice"
import { Formik } from "formik"
import { useEffect, useState } from "react"
import { GiCancel } from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import styles from "./styles.module.css"
const Agent = () => {
  const dispatch = useDispatch()
  const { editAgent }: any = useSelector((store) => store)
  const [showModal, setShowModal] = useState(false)
  const [deletModala, setDeleteModal] = useState(false)
  const [convertedData, setConvertedData] = useState()
  const [agentId, setAgentId] = useState()
  const table_head = [
    { text: "Id" },
    { text: "Email Address" },
    { text: "Phone Number" },
    { text: "Date added" },
    { text: "Role" },
    { text: "Status" },
    { text: "Actions" },
  ]
  const table_body = [
    {
      ref: "MKOP_WJ22",
      customer: "Jerry Olakunle",
      type: "Withdrawal",
      Date: "10-12-2023",
      amount: "#10000",
      status: "Successful",
    },
  ]

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]
  const handleSelect = (selectedOption: any) => {
    console.log("Selected Option:", selectedOption)
  }
  const initSchema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    email: yup.string().required("Please enter email"),
    phone: yup.string().required("Please enter phone number"),
    role: yup.string().required("Please select role"),
    password: yup.string().required("Please select status"),
  })

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    status: "",
  }

  const [
    inviteMemberOrganization,
    {
      data: inviteMemberOrganizationData,
      isLoading: inviteMemberOrganizationLoad,
      isSuccess: inviteMemberOrganizationSuccess,
      isError: inviteMemberOrganizationFalse,
      error: inviteMemberOrganizationErr,
      reset: inviteMemberOrganizationReset,
    },
  ] = useInviteMemberOrganizationMutation()
  const [
    updateOrganisationUser,
    {
      data: updateOrganisationUserData,
      isLoading: updateOrganisationUserLoad,
      isSuccess: updateOrganisationUserSuccess,
      isError: updateOrganisationUserFalse,
      error: updateOrganisationUserErr,
      reset: updateOrganisationUserReset,
    },
  ] = useUpdateOrganisationUserMutation()

  useEffect(() => {
    if (inviteMemberOrganizationSuccess) {
      setShowModal(false)
      const data = {
        role: "", //AGENT, ADMIN, SUPPORT
        page: "",
        limit: "",
      }
      getOrganizationUsers(data)
    }
  }, [inviteMemberOrganizationSuccess])

  const [
    getOrganizationUsers,
    {
      data: getOrganizationUsersData,
      isLoading: getOrganizationUsersLoad,
      isSuccess: getOrganizationUsersSuccess,
      isError: getOrganizationUsersFalse,
      error: getOrganizationUsersErr,
      reset: getOrganizationUsersReset,
    },
  ] = useGetOrganizationUsersMutation()
  const [
    deletOrganisationUser,
    {
      data: deletOrganisationUserData,
      isLoading: deletOrganisationUserLoad,
      isSuccess: deletOrganisationUserSuccess,
      isError: deletOrganisationUserFalse,
      error: deletOrganisationUserErr,
      reset: deletOrganisationUserReset,
    },
  ] = useDeletOrganisationUserMutation()

  deletOrganisationUser

  useEffect(() => {
    const data = {
      role: "", //AGENT, ADMIN, SUPPORT
      page: "",
      limit: "",
    }
    getOrganizationUsers(data)
  }, [])
  useEffect(() => {
    if (deletOrganisationUserSuccess) {
      const data = {
        role: "", //AGENT, ADMIN, SUPPORT
        page: "",
        limit: "",
      }
      getOrganizationUsers(data)
      setDeleteModal(false)
    }
  }, [deletOrganisationUserSuccess])
  useEffect(() => {
    if (updateOrganisationUserSuccess) {
      const data = {
        role: "", //AGENT, ADMIN, SUPPORT
        page: "",
        limit: "",
      }
      getOrganizationUsers(data)
      setShowModal(false)
    }
    console.log(getOrganizationUsersData)
  }, [updateOrganisationUserSuccess])
  useEffect(() => {
    if (getOrganizationUsersSuccess) {
      const convertUserObject = (user: any) => {
        return {
          ref: user.id,
          customer: user.emailAddress,
          amount: user.phoneNumber,
          Date: user.createdAt,
          type: user.role,
          status: user.status,
        }
      }

      // Assuming getOrganizationUsersData?.data is an array
      const convertedData = getOrganizationUsersData?.data.map((user: any) =>
        convertUserObject(user)
      )

      setConvertedData(convertedData)
      console.log(convertedData)
    }
  }, [getOrganizationUsersSuccess, getOrganizationUsersData])

  const data = ["ADMIN", "AGENT", "SUPPORT"]
  const statusData = ["ACTIVE", "INACTIVE"]
  return (
    <div className={styles.dash_layout}>
      {showModal ? (
        <Modal>
          <Formik
            validationSchema={editAgent?.customer ? null : initSchema}
            initialValues={initialValues}
            validateOnChange={true}
            onSubmit={(values, { setSubmitting }) => {
              const editAgentData = {
                user_id: editAgent?.ref,
                status: values?.role,
              }
              const data = {
                invitee_email: values?.email,
                invitee_name: values?.name,
                invitee_role: values?.role, //ADMIN, AGENT, SUPPORT
                invitee_phone: values?.phone,
                invitee_password: values?.password,
              }
              if (editAgent?.customer) {
                updateOrganisationUser(editAgentData)
              } else {
                inviteMemberOrganization(data)
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              setFieldValue,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={styles.agent_inner}>
                  {" "}
                  <div className={styles.new_agent}>
                    <div>
                      <h2>New Agents</h2>
                      <p>Add a new agent to a station</p>
                    </div>
                    <GiCancel
                      onClick={() => {
                        setShowModal((prev) => !prev),
                          dispatch(clearEditAgent())
                      }}
                    />
                  </div>
                  {!editAgent?.customer ? (
                    <>
                      <div className={styles.input_drill}>
                        <PrimaryInput
                          label="Agent name"
                          type="text"
                          name="agent_name"
                          value={values?.name}
                          onchange={(e: any) =>
                            setFieldValue("name", e.target.value)
                          }
                          placeholder="Enter agent name"
                        />
                      </div>
                      <div className={styles.input_drill}>
                        <PrimaryInput
                          label="Agent Email"
                          type="text"
                          name="agent_email"
                          value={values?.email}
                          onchange={(e: any) =>
                            setFieldValue("email", e.target.value)
                          }
                          placeholder="Enter agent name"
                        />
                      </div>
                      <div className={styles.input_drill}>
                        <PrimarySelect
                          options={data}
                          label="Select Agent Role"
                          onchange={(e: any) =>
                            setFieldValue("role", e.target.value)
                          }
                        />
                      </div>
                      <div className={styles.input_drill}>
                        <PrimaryInput
                          label="Agent Password"
                          type="text"
                          name="agent_password"
                          value={values?.password}
                          onchange={(e: any) =>
                            setFieldValue("password", e.target.value)
                          }
                          placeholder="Enter agent name"
                        />
                      </div>
                      <div className={styles.input_drill}>
                        <PrimaryInput
                          label="Phone Number"
                          type="number"
                          value={values?.phone}
                          name="agent_phone"
                          onchange={(e: any) =>
                            setFieldValue("phone", e.target.value)
                          }
                          placeholder="Choose a station"
                        />
                      </div>
                      <PrimartButton
                        load={inviteMemberOrganizationLoad}
                        text="Assign agent"
                        active={true}
                        onClick={() => null}
                      />
                    </>
                  ) : (
                    <>
                      <div className={styles.input_drill}>
                        <PrimarySelect
                          options={statusData}
                          label="Select Agent Role"
                          onchange={(e: any) =>
                            setFieldValue("role", e.target.value)
                          }
                        />
                      </div>
                      <PrimartButton
                        load={updateOrganisationUserLoad}
                        text="Assign agent"
                        active={true}
                        onClick={() => null}
                      />
                    </>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </Modal>
      ) : null}
      <Cover>
        <div className={styles.add_agent}>
          <h1>Agents</h1>
          <div className={styles.add_agent_btn}>
            <PrimartButton
              load={null}
              text="Add agent"
              active={true}
              onClick={() => setShowModal((prev) => !prev)}
            />
          </div>
        </div>
        <div className={styles.filter_div}>
          <div>
            <p>Filter: </p>
            <CustomDropdown
              options={options}
              onSelect={handleSelect}
              placeholder="All"
            />
          </div>
        </div>

        <Table
          deleteAction={(id: any) => {
            setDeleteModal(true), setAgentId(id)
          }}
          editModal={() => setShowModal(true)}
          table_head={table_head}
          load={getOrganizationUsersLoad}
          table_body={convertedData}
          onClick={() => null}
          noItemFound={getOrganizationUsersData?.length <= 0 ? true : false}
        />
      </Cover>
      {deletModala ? (
        <div className={styles.modalOuter}>
          <div className={styles.modalInner}>
            <h3>Are you sure</h3>
            <div className={styles.conundrum}>
              <PrimartButton
                active={true}
                onClick={() => deletOrganisationUser({ user_id: agentId })}
                load={deletOrganisationUserLoad}
                text="delete"
              />
              <OutlineButton
                onClick={() => setDeleteModal(false)}
                text="cancl"
              />
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  )
}

export default Agent
