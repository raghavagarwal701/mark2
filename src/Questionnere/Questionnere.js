import React, { useState, useMemo, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from "./Questionnere.module.css";
import Question from "../Questions/Question";
import jsPDF from "jspdf";
import "jspdf-autotable";



const Questionnere = (props) => {
  const [updatedData, setUpdatedData] = useState({});
  const questionnaire = useMemo(
    () => ({
      essential1: [
        {
          name: "Essential One (Application Control) - Access Control:",
          question:
            'Is there a centralized system for managing user access rights and permissions to critical systems and data?',
          options: [
            [
              "Not Implemented: The organization has not implemented any centralized system for managing user access rights and permissions to critical systems and data.",
              0,
            ],
            [
              "Initial Implementation: The organization has started implementing a centralized system for managing user access rights and permissions, but it is not fully operational or covers all critical systems and data.",
              1,
            ],
            [
              "Substantial Implementation: The organization has made significant progress in implementing a centralized system for managing user access rights and permissions, covering some critical systems and data, but there are still some areas that need improvement.",
              2,
            ],
            [
              "Fully Implemented: The organization has fully implemented a centralized system for managing user access rights and permissions, covering all critical systems and data.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential One (Application Control) - Incident Response:",
          question:
            "Is there a documented incident response plan that outlines the steps to be taken in the event of a cyber incident?",
          options: [
            [
              "Not Implemented: The organization does not have a documented incident response plan outlining the steps to be taken in the event of a cyber incident",
              0,
            ],
            [
              "Initial Development: The organization has started developing an incident response plan, but it is not yet fully documented or comprehensive.",
              1,
            ],
            [
              "Developing: The organization has a work-in-progress incident response plan, which outlines some steps to be taken in the event of a cyber incident, but it may not cover all potential scenarios or have clear procedures.",
              1,
            ],
            [
              "Partially Implemented: The organization has made some progress in documenting an incident response plan, but there are still significant gaps or areas that need improvement",
              1,
            ],
            [
              "Fully Implemented: The organization has a fully documented incident response plan that outlines clear and comprehensive steps to be taken in the event of a cyber incident.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential One (Application Control) - Patch Management:",
          question:
            "Are there procedures in place for regularly applying security patches to operating systems and software?",
          options: [
            [
              "Not Implemented: The organization does not have procedures in place for regularly applying security patches to operating systems and software.",
              0,
            ],
            [
              "Initial Implementation: The organization has started implementing patch management procedures, but they are not yet consistently applied or may not cover all systems and software.",
              1,
            ],
            [
              "Developing: The organization has some patch management procedures in place, and efforts are underway to ensure regular application of security patches, but there is room for improvement and consistency.",
              1,
            ],
            [
              "Partially Implemented: The organization has made progress in establishing patch management procedures, but there are still significant gaps or systems and software that do not receive regular security patches.",
              1,
            ],
            [
              "Fully Implemented: The organization has fully established procedures for regularly applying security patches to operating systems and software, covering all critical systems and software components.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential One (Application Control) - Data Protection:",
          question:
            "Is data encryption used to protect sensitive information stored on company devices or transmitted over networks?",
          options: [
            [
              "Not Implemented: Data encryption is not used to protect sensitive information stored on company devices or transmitted over networks.",
              0,
            ],
            [
              "Initial Implementation: The organization has started to implement data encryption for sensitive information, but it is not yet consistently applied across all devices and network transmissions.",
              1,
            ],
            [
              "Developing: The organization has made some progress in implementing data encryption measures, and efforts are underway to ensure its consistent use, but there is room for improvement. ",
              1,
            ],
            [
              "Partially Implemented: Data encryption is partially implemented to protect sensitive information, but there are still significant gaps in coverage or some devices and network channels remain unencrypted.",
              1,
            ],
            [
              "Fully Implemented: The organization has fully implemented data encryption to protect sensitive information on company devices and during network transmissions.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential2: [
        {
          name: "Essential Two (Patch Applications) - Patch Applications: ",
          question:
            "Is there a documented process for assessing software applications for security vulnerabilities and updates?",
          options: [
            [
              "Not Implemented: The organization does not have a documented process for assessing software applications for security vulnerabilities and updates.",
              0,
            ],
            [
              "Initial Development: The organization has started developing a process for assessing software applications for security vulnerabilities and updates, but it is not yet fully documented or consistently applied.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a process for assessing software applications, and efforts are underway to improve its documentation and implementation.",
              1,
            ],
            [
              "Partially Implemented: The organization has a partially documented process for assessing software applications for security vulnerabilities and updates, but there are still significant gaps in coverage or consistency.",
              1,
            ],
            [
              "Fully Implemented: The organization has a well-documented and established process for assessing software applications for security vulnerabilities and updates, consistently applied across the organization.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Two (Patch Applications) - Patch Testing:",
          question:
            "Are non-critical patches tested for compatibility and stability before deployment?",
          options: [
            [
              "Not Implemented: The organization does not have a process for testing non-critical patches for compatibility and stability before deployment.",
              0,
            ],
            [
              "Initial Development: The organization has started developing a process for testing non-critical patches, but it is not yet fully established or consistently applied. ",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a process for testing non-critical patches, and efforts are underway to improve its implementation and coverage",
              1,
            ],
            [
              "Partially Implemented: The organization has a partially established process for testing non-critical patches for compatibility and stability, but there are still significant gaps or inconsistencies. ",
              1,
            ],
            [
              "Fully Implemented: The organization has a well-established process for testing non-critical patches for compatibility and stability before deployment, consistently applied across the organization.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Two (Patch Applications) - Emergency Patching:",
          question:
            "Is there a process for emergency patching to address critical security vulnerabilities?",
          options: [
            [
              "Not Implemented: The organization does not have a process for emergency patching to address critical security vulnerabilities.",
              0,
            ],
            [
              "Initial Development: The organization has started developing a process for emergency patching, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a process for emergency patching, and efforts are underway to improve its implementation and response time.",
              1,
            ],
            [
              "Partially Implemented: The organization has a partially established process for emergency patching to address critical security vulnerabilities, but there are still significant gaps or inconsistencies in the response.",
              1,
            ],
            [
              "Fully Implemented: The organization has a well-established process for emergency patching, enabling a swift and effective response to critical security vulnerabilities as they arise.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Two (Patch Applications) - Patch Verification:",
          question:
            "Are there procedures to monitor and verify the successful application of software patches across the organization",
          options: [
            [
              "Not Implemented: The organization does not have procedures to monitor and verify the successful application of software patches across the organization.",
              0,
            ],
            [
              "Initial Development: The organization has started developing procedures for patch verification, but they are not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating procedures for patch verification, and efforts are underway to improve their implementation and coverage.",
              1,
            ],
            [
              "Partially Implemented: The organization has partially established procedures to monitor and verify the successful application of software patches, but there are still significant gaps or inconsistencies in the verification process.",
              1,
            ],
            [
              "Fully Implemented: The organization has well-established procedures to monitor and verify the successful application of software patches across the organization, ensuring a reliable and comprehensive verification process.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential3: [
        {
          name: "Essential Three (Configure Microsoft Office Macro Settings) - Microsoft Office Macro Settings:",
          question:
            "Is there a documented policy or procedure for configuring Microsoft Office macro settings?",
          options: [
            [
              "Not Documented: The organization does not have a documented policy or procedure for configuring Microsoft Office macro settings.",
              0,
            ],
            [
              "Initial Documentation: The organization has started documenting a policy or procedure for configuring Microsoft Office macro settings, but it is not yet fully comprehensive or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in documenting a policy or procedure for configuring Microsoft Office macro settings, and efforts are underway to improve its implementation and coverage. ",
              1,
            ],
            [
              "Partially Documented: The organization has partially documented a policy or procedure for configuring Microsoft Office macro settings, but there are still significant gaps or inconsistencies in its documentation and application.",
              1,
            ],
            [
              "Fully Documented: The organization has a fully documented policy or procedure for configuring Microsoft Office macro settings, ensuring consistency and effectiveness in managing macro security.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Three (Configure Microsoft Office Macro Settings) - Blocking Macros:",
          question:
            "Is Microsoft Office configured to block macros from the internet and external sources?",
          options: [
            [
              "Not Configured: Microsoft Office macro settings are not configured to block macros from the internet and external sources.",
              0,
            ],
            [
              "Partially Configured: Microsoft Office macro settings are partially configured to block macros from the internet and external sources, but there may be some exceptions or loopholes.",
              1,
            ],
            [
              "Developing: Efforts are underway to configure Microsoft Office macro settings to block macros from the internet and external sources, and progress is being made, but it is not yet fully implemented.",
              1,
            ],
            [
              "Partially Implemented: Microsoft Office macro settings are configured to block macros from the internet and external sources, but there are still some systems or instances where the settings are not consistently applied.",
              1,
            ],
            [
              "Fully Implemented: Microsoft Office macro settings are fully configured to block macros from the internet and external sources, ensuring comprehensive protection against potentially malicious macros.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Three (Configure Microsoft Office Macro Settings) - Evaluating Macros:",
          question:
            "Is there a process to evaluate and enable macros from trusted sources on a case-by-case basis?",
          options: [
            [
              "Not Implemented: The organization does not have a process to evaluate and enable macros from trusted sources on a case-by-case basis.",
              0,
            ],
            [
              "Initial Development: The organization has started developing a process to evaluate and enable macros from trusted sources on a case-by-case basis, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a process to evaluate and enable macros from trusted sources, and efforts are underway to improve its implementation and coverage.",
              1,
            ],
            [
              "Partially Implemented: The organization has partially implemented a process to evaluate and enable macros from trusted sources on a case-by-case basis, but there are still significant gaps or inconsistencies in the evaluation and decision-making process.",
              1,
            ],
            [
              "Fully Implemented: The organization has a well-established process to evaluate and enable macros from trusted sources on a case-by-case basis, ensuring a careful and secure approach to using macros when necessary.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Three (Configure Microsoft Office Macro Settings) - Employee Education:",
          question:
            "Have employees been educated about the risks associated with enabling macros from unknown or untrusted sources?",
          options: [
            [
              "Not Educated: Employees are not educated about the risks associated with enabling macros from unknown or untrusted sources.",
              0,
            ],
            [
              "Initial Education: The organization has started providing education to employees about the risks associated with enabling macros from unknown or untrusted sources, but it is not yet fully comprehensive or consistently conducted.",
              1,
            ],
            [
              "Developing: The organization has made some progress in educating employees about the risks associated with enabling macros from unknown or untrusted sources, and efforts are underway to improve its coverage and effectiveness.",
              1,
            ],
            [
              "Partially Educated: Employees have received some education about the risks associated with enabling macros from unknown or untrusted sources, but there are still significant gaps in understanding or awareness.",
              1,
            ],
            [
              "Fully Educated: Employees are fully educated about the risks associated with enabling macros from unknown or untrusted sources, and they are aware of the necessary precautions to take when dealing with macros.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Three (Configure Microsoft Office Macro Settings) - Macro Antivirus Scanning:",
          question:
            "Is macro antivirus scanning enabled to detect and block potentially malicious macros?",
          options: [
            [
              "Not Enabled: Macro antivirus scanning is not enabled to detect and block potentially malicious macros.",
              0,
            ],
            [
              "Partially Enabled: Macro antivirus scanning is partially enabled, but it may not be consistently applied or may have limited coverage for detecting and blocking potentially malicious macros.",
              1,
            ],
            [
              "Developing: Efforts are underway to enable macro antivirus scanning for detecting and blocking potentially malicious macros, but it is not yet fully implemented or operational.",
              1,
            ],
            [
              "Partially Implemented: Macro antivirus scanning is partially implemented, and it can detect and block some potentially malicious macros, but there are still significant gaps or limitations in its effectiveness.",
              1,
            ],
            [
              "Fully Implemented: Macro antivirus scanning is fully enabled, detecting and blocking potentially malicious macros effectively to enhance security.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential4: [
        {
          name: "Essential Four (User Application Hardening) - Security Features for User Applications:",
          question:
            "Are web browsers and email clients configured with security features like pop-up blockers, script blocking, and secure browsing?",
          options: [
            [
              "Not Configured: Web browsers and email clients are not configured with security features like pop-up blockers, script blocking, and secure browsing.",
              0,
            ],
            [
              "Partially Configured: Security features for web browsers and email clients are partially configured, but there may be some missing features or inconsistencies in their implementation.",
              1,
            ],
            [
              "Developing: Efforts are underway to configure security features for web browsers and email clients, and progress is being made, but it is not yet fully implemented or operational.",
              1,
            ],
            [
              "Partially Implemented: Security features like pop-up blockers, script blocking, and secure browsing are partially implemented in web browsers and email clients, but there are still significant gaps or limitations in their application.",
              1,
            ],
            [
              "Fully Implemented: Web browsers and email clients are fully configured with security features, including pop-up blockers, script blocking, and secure browsing, providing a robust defense against potential threats.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Four (User Application Hardening) - Security Training for Employees:",
          question:
            "Are employees regularly trained to identify and report suspicious emails, phishing attempts, and social engineering attacks?",
          options: [
            [
              "Not Provided: Employees are not regularly trained to identify and report suspicious emails, phishing attempts, and social engineering attacks.",
              0,
            ],
            [
              "Infrequent Training: Employees receive security training, but it is infrequent and may not cover all aspects of identifying and reporting suspicious emails, phishing attempts, and social engineering attacks.",
              1,
            ],
            [
              "Developing: Efforts are underway to regularly train employees on identifying and reporting suspicious emails, phishing attempts, and social engineering attacks, but the training program is not yet fully comprehensive or consistently conducted.",
              1,
            ],
            [
              "Partially Trained: Employees receive some training on identifying and reporting suspicious activities, but there are still significant gaps in their knowledge and awareness.",
              1,
            ],
            [
              "Fully Trained: Employees are regularly and comprehensively trained to identify and report suspicious emails, phishing attempts, and social engineering attacks, enhancing the organization's security posture.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Four (User Application Hardening) - Assessment of Security Settings:",
          question:
            "Is there a process to assess and strengthen the security settings of user applications based on their specific needs and risk profiles?",
          options: [
            [
              "Not Implemented: There is no process to assess and strengthen the security settings of user applications based on their specific needs and risk profiles.",
              0,
            ],
            [
              "Initial Development: Efforts have started to develop a process to assess and strengthen the security settings of user applications based on their specific needs and risk profiles, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a process to assess and strengthen the security settings of user applications, and efforts are underway to improve its implementation and coverage.",
              1,
            ],
            [
              "Partially Implemented: A process exists to assess and strengthen the security settings of user applications based on their specific needs and risk profiles, but there are still significant gaps or inconsistencies in its application.",
              1,
            ],
            [
              "Fully Implemented: There is a well-established process to assess and strengthen the security settings of user applications based on their specific needs and risk profiles, ensuring a secure and tailored approach to application security.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Four (User Application Hardening) - Review and Update of Security Configurations:",
          question:
            "Is there an effort to review and update security configurations to align with current threats and best practices?",
          options: [
            [
              "Not Performed: There is no effort to review and update security configurations to align with current threats and best practices.",
              0,
            ],
            [
              "Initial Efforts: Some initial efforts have been made to review and update security configurations, but it is not yet a consistent or comprehensive practice.",
              1,
            ],
            [
              "Development: Efforts are underway to review and update security configurations to align with current threats and best practices, and progress is being made to improve its coverage and effectiveness.",
              1,
            ],
            [
              "Partially Implemented: Security configurations are partially reviewed and updated to align with current threats and best practices, but there are still significant gaps or inconsistencies in this process.",
              1,
            ],
            [
              "Fully Implemented: There is a well-established practice to regularly review and update security configurations, ensuring they align with current threats and industry best practices, contributing to a strong security posture.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Four (User Application Hardening) - Timely Deployment of Software Updates:",
          question:
            "Are software updates and security patches for user applications deployed in a timely manner?",
          options: [
            [
              "Not Timely: Software updates and security patches for user applications are not deployed in a timely manner.",
              0,
            ],
            [
              "Infrequent Updates: Software updates and security patches are deployed, but the frequency of updates is infrequent and may not keep up with the latest releases.",
              1,
            ],
            [
              "Developing: Efforts are underway to improve the timely deployment of software updates and security patches for user applications, but it is not yet fully consistent or comprehensive.",
              1,
            ],
            [
              "Partially Timely: Software updates and security patches are partially deployed in a timely manner, but there are still significant delays or gaps in the update process.",
              1,
            ],
            [
              "Fully Timely: Software updates and security patches for user applications are consistently and promptly deployed in a timely manner, ensuring that systems are up-to-date and secure against known vulnerabilities.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential5: [
        {
          name: "Essential Five (Restrict Administrative Privileges) - Restrict Administrative Privileges:",
          question:
            "Is there a documented policy or procedure for restricting administrative privileges?",
          options: [
            [
              "Not Documented: There is no documented policy or procedure for restricting administrative privileges.",
              0,
            ],
            [
              "Initial Development: Efforts have started to develop a policy or procedure for restricting administrative privileges, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a documented policy or procedure for restricting administrative privileges, and efforts are underway to improve its implementation and coverage.",
              1,
            ],
            [
              "Partially Documented: There is a partially documented policy or procedure for restricting administrative privileges, but there are still significant gaps or inconsistencies in its application.",
              1,
            ],
            [
              "Fully Documented: There is a well-documented policy or procedure for restricting administrative privileges, ensuring a secure and controlled approach to granting elevated access.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Five (Restrict Administrative Privileges) - Principle of Least Privilege:",
          question:
            "Is the principle of least privilege consistently applied to grant administrative access only when necessary for specific job roles?",
          options: [
            [
              "Not Applied: The principle of least privilege is not consistently applied, and administrative access may not be restricted to only necessary job roles.",
              0,
            ],
            [
              "Partially Applied: The principle of least privilege is partially applied, but there may be instances where administrative access is granted beyond what is necessary for specific job roles.",
              1,
            ],
            [
              "Developing: Efforts are underway to consistently apply the principle of least privilege, and progress is being made in restricting administrative access to specific job roles.",
              1,
            ],
            [
              "Partially Consistent: The principle of least privilege is partially and consistently applied, but there are still some areas where administrative access may not align with specific job roles.",
              1,
            ],
            [
              "Fully Applied: The principle of least privilege is fully and consistently applied, ensuring administrative access is granted only when necessary for specific job roles.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Five (Restrict Administrative Privileges) - Administrative Privilege Review:",
          question:
            "Are administrative privileges regularly reviewed and revoked for employees who no longer require them?",
          options: [
            [
              "Not Reviewed: Administrative privileges are not regularly reviewed, and there may be employees who still retain unnecessary privileges even though they no longer require them.",
              0,
            ],
            [
              "Infrequent Review: Administrative privileges are reviewed, but the review process is infrequent and may not cover all employees, leading to some retaining unnecessary privileges.",
              1,
            ],
            [
              "Developing: Efforts are underway to improve the regular review of administrative privileges, and progress is being made to identify and revoke privileges for employees who no longer require them.",
              1,
            ],
            [
              "Partially Reviewed: Administrative privileges are partially reviewed, and some employees have unnecessary privileges revoked, but there are still significant gaps in the review process.",
              1,
            ],
            [
              "Fully Reviewed: Administrative privileges are regularly and comprehensively reviewed, ensuring that employees who no longer require them have their privileges promptly revoked.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Five (Restrict Administrative Privileges) - Employee Awareness:",
          question:
            "Are employees informed about the risks associated with administrative privileges and the measures to protect them?",
          options: [
            [
              "Not Informed: Employees are not informed about the risks associated with administrative privileges and the measures to protect them.",
              0,
            ],
            [
              "Partially Informed: Some employees have been informed about the risks associated with administrative privileges and the measures to protect them, but not all employees are aware of these risks and measures.",
              1,
            ],
            [
              "Developing: Efforts are underway to inform employees about the risks associated with administrative privileges and the measures to protect them, and progress is being made in raising awareness among the workforce.",
              1,
            ],
            [
              "Partially Implemented: Employees are partially informed about the risks associated with administrative privileges and the protective measures, but there are still significant gaps in awareness and understanding.",
              1,
            ],
            [
              "Fully Informed: All employees are informed about the risks associated with administrative privileges and the measures to protect them, ensuring a well-educated and security-conscious workforce.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Five (Restrict Administrative Privileges) - Monitoring and Auditing:",
          question:
            "Is there a process to monitor and audit administrative actions to detect potential misuse or unauthorized access?",
          options: [
            [
              "Not Implemented: There is no process to monitor and audit administrative actions to detect potential misuse or unauthorized access.",
              0,
            ],
            [
              "Initial Development: Efforts have started to develop a process to monitor and audit administrative actions, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in implementing a process to monitor and audit administrative actions, and efforts are underway to improve its coverage and effectiveness.",
              1,
            ],
            [
              "Partially Implemented: A process is partially implemented to monitor and audit administrative actions, but there are still significant gaps or inconsistencies in its application.",
              1,
            ],
            [
              "Fully Implemented: There is a well-established process to monitor and audit administrative actions, enabling the organization to detect potential misuse or unauthorized access effectively.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential6: [
        {
          name: "Essential Six (Patch Operating Systems) - Documented Process for Patching Operating Systems:",
          question:
            "Is there a documented process for testing and deploying operating system patches across the organization?",
          options: [
            [
              "Not Documented: There is no documented process for testing and deploying operating system patches across the organization.",
              0,
            ],
            [
              "Initial Development: Efforts have started to develop a documented process for testing and deploying operating system patches, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a documented process for testing and deploying operating system patches, and efforts are underway to improve its implementation and coverage.",
              1,
            ],
            [
              "Partially Documented: There is a partially documented process for testing and deploying operating system patches, but there are still significant gaps or inconsistencies in its application.",
              1,
            ],
            [
              "Fully Documented: There is a well-documented process for testing and deploying operating system patches across the organization, ensuring a systematic and secure approach to maintaining up-to-date systems.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Six (Patch Operating Systems) - Review Frequency of Operating System Patches:",
          question:
            "Is there an established frequency for reviewing security updates and patches for operating systems on all devices?",
          options: [
            [
              "Not Established: There is no established frequency for reviewing security updates and patches for operating systems on all devices.",
              0,
            ],
            [
              "Initial Efforts: Efforts have started to establish a frequency for reviewing security updates and patches for operating systems, but it is not yet consistently followed or formalized.",
              1,
            ],
            [
              "Developing: The organization has made some progress in establishing a frequency for reviewing security updates and patches for operating systems on all devices, and efforts are underway to improve its regularity and effectiveness.",
              1,
            ],
            [
              "Partially Established: There is a partially established frequency for reviewing security updates and patches for operating systems, but there are still significant gaps or inconsistencies in its implementation.",
              1,
            ],
            [
              "Fully Established: There is a well-established frequency for reviewing security updates and patches for operating systems on all devices, ensuring regular and timely assessments to maintain a secure environment.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Six (Patch Operating Systems) - Prioritization of Critical Security Patches:",
          question:
            "Are critical security patches prioritized and applied promptly to mitigate potential vulnerabilities?",
          options: [
            [
              "Not Prioritized: Critical security patches are not prioritized and applied promptly, leading to delays in mitigating potential vulnerabilities.",
              0,
            ],
            [
              "Partially Prioritized: Critical security patches are partially prioritized, and some are applied promptly, but there may be delays in addressing others.",
              1,
            ],
            [
              "Developing: Efforts are underway to improve the prioritization of critical security patches and their prompt application, but it is not yet consistently followed or formalized.",
              1,
            ],
            [
              "Partially Prioritized: There is a partially established process for prioritizing and applying critical security patches promptly, but there are still significant gaps or inconsistencies in its implementation.",
              1,
            ],
            [
              "Fully Prioritized: Critical security patches are fully prioritized, and a well-established process ensures their prompt application to mitigate potential vulnerabilities effectively.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Six (Patch Operating Systems) - Challenges with Patching on Different Devices:",
          question:
            "Have specific challenges or considerations been identified for patching on different types of devices?",
          options: [
            [
              "Not Identified: There are no specific challenges or considerations identified for patching on different types of devices.",
              0,
            ],
            [
              "Initial Identification: Some initial challenges or considerations have been identified for patching on different types of devices, but they are not yet fully understood or addressed.",
              1,
            ],
            [
              "Developing: Efforts are underway to identify specific challenges or considerations for patching on different types of devices, and progress is being made to understand and address them.",
              1,
            ],
            [
              "Partially Identified: There are partially identified challenges or considerations for patching on different types of devices, but there are still significant gaps in understanding and addressing them.",
              1,
            ],
            [
              "Fully Identified: Specific challenges or considerations for patching on different types of devices have been fully identified, enabling the organization to address them effectively and ensure comprehensive patch management across all devices.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Six (Patch Operating Systems) - Measurement and Reporting of Patch Management Success:",
          question:
            "Is there a process in place to measure and report on the success of the patch management process?",
          options: [
            [
              "Not Implemented: There is no process in place to measure and report on the success of the patch management process.",
              0,
            ],
            [
              "Initial Development: Efforts have started to develop a process for measuring and reporting on the success of the patch management process, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a process to measure and report on the success of the patch management process, and efforts are underway to improve its implementation and coverage.",
              1,
            ],
            [
              "Partially Implemented: There is a partially implemented process to measure and report on the success of the patch management process, but there are still significant gaps or inconsistencies in its application.",
              1,
            ],
            [
              "Fully Implemented: There is a well-established process to measure and report on the success of the patch management process, providing valuable insights to ensure continuous improvement and effectiveness.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential7: [
        {
          name: "Essential Seven (Multi-Factor Authentication) - Multi-factor Authentication (MFA) Implementation:",
          question:
            "Is multi-factor authentication implemented for accessing company systems, networks, and sensitive data?",
          options: [
            [
              "Not Implemented: Multi-factor authentication (MFA) is not implemented for accessing company systems, networks, and sensitive data.",
              0,
            ],
            [
              "Initial Implementation: Efforts have started to implement multi-factor authentication (MFA) for accessing company systems, networks, and sensitive data, but it is not yet fully rolled out or consistently applied.",
              1,
            ],
            [
              "Developing: The organization has made some progress in implementing multi-factor authentication (MFA), and efforts are underway to improve its coverage and effectiveness for accessing company resources.",
              1,
            ],
            [
              "Partially Implemented: Multi-factor authentication (MFA) is partially implemented for accessing company systems, networks, and sensitive data, but there are still significant areas where MFA has not been fully deployed.",
              1,
            ],
            [
              "Fully Implemented: Multi-factor authentication (MFA) is fully implemented for accessing company systems, networks, and sensitive data, providing an additional layer of security to protect against unauthorized access.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Seven (Multi-Factor Authentication) - Employee Education:",
          question:
            "Are employees educated on the importance of using MFA and the risks associated with single-factor authentication?",
          options: [
            [
              "Not Implemented: Multi-factor authentication (MFA) is not implemented for accessing company systems, networks, and sensitive data.",
              0,
            ],
            [
              "Initial Implementation: Efforts have started to implement multi-factor authentication (MFA) for accessing company systems, networks, and sensitive data, but it is not yet fully rolled out or consistently applied.",
              1,
            ],
            [
              "Developing: The organization has made some progress in implementing multi-factor authentication (MFA), and efforts are underway to improve its coverage and effectiveness for accessing company resources.",
              1,
            ],
            [
              "Partially Implemented: Multi-factor authentication (MFA) is partially implemented for accessing company systems, networks, and sensitive data, but there are still significant areas where MFA has not been fully deployed.",
              1,
            ],
            [
              "Fully Implemented: Multi-factor authentication (MFA) is fully implemented for accessing company systems, networks, and sensitive data, providing an additional layer of security to protect against unauthorized access.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Seven (Multi-Factor Authentication) - Review Process:",
          question:
            "Is there a periodic review process for assessing and strengthening the implementation of MFA?",
          options: [
            [
              "Not Implemented: There is no periodic review process for assessing and strengthening the implementation of MFA.",
              0,
            ],
            [
              "Initial Development: Efforts have started to develop a periodic review process for assessing and strengthening MFA implementation, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a periodic review process for assessing and strengthening MFA implementation, and efforts are underway to improve its regularity and effectiveness.",
              1,
            ],
            [
              "Partially Implemented: There is a partially implemented periodic review process for assessing and strengthening MFA, but there are still significant gaps or inconsistencies in its application.",
              1,
            ],
            [
              "Fully Implemented: There is a well-established periodic review process for assessing and strengthening the implementation of MFA, ensuring continuous improvement and security enhancements.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Seven (Multi-Factor Authentication) - Balancing Security and Convenience:",
          question:
            "Is there consideration given to balancing security and user convenience regarding MFA methods?",
          options: [
            [
              "Not Considered: There is no consideration given to balancing security and user convenience regarding MFA methods. Security and convenience are not balanced effectively.",
              0,
            ],
            [
              "Initial Consideration: Some initial consideration is given to balancing security and user convenience regarding MFA methods, but it is not yet fully implemented or consistently applied.",
              1,
            ],
            [
              "Developing: Efforts are underway to balance security and user convenience regarding MFA methods, and progress is being made to strike a suitable balance.",
              1,
            ],
            [
              "Partially Balanced: There is partial consideration given to balancing security and user convenience regarding MFA methods, but there are still significant areas where the balance needs improvement.",
              1,
            ],
            [
              "Fully Balanced: Security and user convenience are fully balanced regarding MFA methods, providing a seamless yet secure authentication experience for users.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Seven (Multi-Factor Authentication) - Backup Plan:",
          question:
            "Is there a backup plan in case MFA methods (e.g., authenticator apps) become unavailable?",
          options: [
            [
              "No Backup Plan: There is no backup plan in case MFA methods (e.g., authenticator apps) become unavailable.",
              0,
            ],
            [
              "Initial Development: Efforts have started to develop a backup plan in case MFA methods become unavailable, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a backup plan for unavailable MFA methods, and efforts are underway to improve its implementation and coverage.",
              1,
            ],
            [
              "Partially Implemented: There is a partially implemented backup plan in case MFA methods become unavailable, but there are still significant gaps or inconsistencies in its application.",
              1,
            ],
            [
              "Fully Implemented: There is a well-established backup plan in case MFA methods (e.g., authenticator apps) become unavailable, ensuring users have an alternative authentication method for secure access.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
      essential8: [
        {
          name: "Essential Eight (Regular Backups) - Regular Backups:",
          question:
            "Are critical company data and systems regularly backed up to secure and isolated locations?",
          options: [
            [
              "Not Implemented: Critical company data and systems are not regularly backed up to secure and isolated locations.",
              0,
            ],
            [
              "Infrequent Backups: Backups for critical company data and systems are infrequent, and they may not be stored in secure and isolated locations consistently.",
              1,
            ],
            [
              "Developing: Efforts are underway to improve the regularity of backups for critical company data and systems and to store them in secure and isolated locations.",
              1,
            ],
            [
              "Partially Implemented: Backups for critical company data and systems are partially implemented regularly, but there are still significant gaps or inconsistencies in their storage in secure and isolated locations.",
              1,
            ],
            [
              "Fully Implemented: Critical company data and systems are regularly backed up and securely stored in isolated locations, ensuring data protection and recovery capabilities.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Eight (Regular Backups) - Data Restoration Testing:",
          question:
            "Is there a process for testing the restoration of data from backups to ensure data integrity?",
          options: [
            [
              "Not Implemented: There is no process for testing the restoration of data from backups to ensure data integrity.",
              0,
            ],
            [
              "Initial Development: Efforts have started to develop a process for testing the restoration of data from backups, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Developing: The organization has made some progress in creating a process for testing the restoration of data from backups to ensure data integrity, and efforts are underway to improve its implementation and coverage.",
              1,
            ],
            [
              "Partially Implemented: There is a partially implemented process for testing the restoration of data from backups, but there are still significant gaps or inconsistencies in its application.",
              1,
            ],
            [
              "Fully Implemented: There is a well-established process for regularly testing the restoration of data from backups, ensuring data integrity and reliable data recovery capabilities.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Eight (Regular Backups) - Employee Awareness:",
          question:
            "Are employees informed about the importance of backups and their role in the backup process?",
          options: [
            [
              "Not Informed: Employees are not informed about the importance of backups and their role in the backup process.",
              0,
            ],
            [
              "Partially Informed: Some employees have received information about the importance of backups and their role in the backup process, but not all employees are aware of these factors.",
              1,
            ],
            [
              "Developing: Efforts are underway to educate employees about the importance of backups and their role in the backup process, and progress is being made in raising awareness among the workforce.",
              1,
            ],
            [
              "Partially Educated: Employees are partially educated about the importance of backups and their role in the backup process, but there are still significant gaps in awareness and understanding.",
              1,
            ],
            [
              "Fully Educated: All employees are educated about the importance of backups and their role in the backup process, promoting a culture of data protection and responsible backup practices.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Eight (Regular Backups) - Backup Encryption:",
          question:
            "Are backups encrypted to protect sensitive data from unauthorized access?",
          options: [
            [
              "Not Encrypted: Backups are not encrypted, and sensitive data is not protected from unauthorized access.",
              0,
            ],
            [
              "Partially Encrypted: Some backups are encrypted to protect sensitive data, but not all backups have encryption applied consistently.",
              1,
            ],
            [
              "Developing: Efforts are underway to improve the encryption of backups to protect sensitive data from unauthorized access, but it is not yet fully implemented or consistently applied.",
              1,
            ],
            [
              "Partially Implemented: Backups are partially encrypted to protect sensitive data, but there are still significant gaps or inconsistencies in the application of encryption measures.",
              1,
            ],
            [
              "Fully Implemented: Backups are fully encrypted, ensuring that all sensitive data is protected from unauthorized access during storage and transmission.",
              2,
            ],
          ],
          choosedOption: null,
        },
        {
          name: "Essential Eight (Regular Backups) - Backup Testing:",
          question:
            "Are backups regularly tested for recoverability and compliance with data retention policies?",
          options: [
            [
              "Not Tested: Backups are not regularly tested for recoverability, and there is no assessment of compliance with data retention policies.",
              0,
            ],
            [
              "Infrequent Testing: Backups are infrequently tested for recoverability and compliance with data retention policies, and the testing process may not be consistent.",
              1,
            ],
            [
              "Developing: Efforts are underway to improve the regularity of backup testing for recoverability and compliance with data retention policies, but it is not yet fully established or consistently followed.",
              1,
            ],
            [
              "Partially Tested: Backups are partially tested for recoverability and compliance with data retention policies, but there are still significant gaps or inconsistencies in the testing process.",
              1,
            ],
            [
              "Fully Tested: Backups are regularly and comprehensively tested for recoverability and compliance with data retention policies, ensuring data availability and adherence to retention requirements.",
              2,
            ],
          ],
          choosedOption: null,
        },
      ],
    }),
    []
  );

  const essentialData = {
    essential1: {
      description:
        "Application Control is a fundamental cybersecurity practice outlined in the Australian Government's Essential Eight framework. It aims to manage the execution of applications within an organization's environment, mitigating the risk of unauthorized or malicious software running on systems. The goal of Application Control is to establish control over what applications can run, ensuring that only trusted and necessary applications are allowed while preventing unauthorized and potentially harmful ones from executing.",
      maturity0: {
        risks:
          "Your organization's current maturity level for Application Control is at Level 0. This level represents the absence of measures to control the execution of applications:\n\n1. High risk of unauthorized and potentially malicious applications running on systems.\n\n2. Lack of visibility into application usage, making it difficult to manage security threats.",
        steps:
          "Maturity Level 0 to Maturity Level 1:\n\n1. Create an Inventory: Begin by thoroughly cataloging all applications operating within your environment. This inventory will serve as the foundation for your application control strategy.\n\n2. Implement Default-Deny Rule: To build upon your inventory, put in place a default-deny rule that prevents any application from executing unless explicitly allowed. Create a whitelist of trusted applications that are essential for business operations.\n\n3. Regular Audits: Conduct regular audits of your application whitelist to ensure it remains accurate and up to date. New applications should be carefully reviewed before adding them to the whitelist.",
      },
      maturity1: {
        risks:
          "Your organization's current maturity level for Application Control is at Level 1, representing a basic capability:\n\n1. Limited control over application execution, as unknown or unwhitelisted applications can still run.\n\n2. Manual audits may be resource-intensive and might not effectively keep the whitelist up-to-date.",
        steps:
          "Maturity Level 1 to Maturity Level 2:\n\n1. Principle of Least Privilege: Enhance your application control policies by adopting the principle of least privilege. Review and adjust permissions and access rights for applications based on their required functionality.\n\n2. Implement Application Sandboxing: Introduce application sandboxing for untrusted software. This isolation technique limits the impact of potentially risky applications by confining them to controlled environments.\n\n3. Automate Whitelist Updates: Automate the process of updating your application whitelist. Implement mechanisms that track changes, validate new applications, and remove outdated ones without manual intervention.",
      },
      maturity2: {
        risks:
          "Your organization's current maturity level for Application Control is at Level 2, representing an intermediate capability:\n\n1. While unauthorized applications are better controlled, risks still exist from sandbox breaches and potential vulnerabilities in whitelisted applications.\n\n2. Without advanced threat detection, sophisticated attacks might bypass existing controls.",
        steps:
          "Maturity Level 2 to Maturity Level 3:\n\n1. Advanced Threat Detection: Implement advanced threat detection mechanisms to identify anomalous behavior exhibited by applications. Employ techniques such as behavioral analysis and machine learning to detect potential threats that might evade traditional controls.\n\n2. Integrate with EDR System: Integrate your application control with your Endpoint Detection and Response (EDR) system. This synergy enhances your ability to correlate application behavior with endpoint activity and respond swiftly to emerging threats.\n\n3. Continuous Monitoring and Updates: Maintain a proactive stance by continuously monitoring the threat landscape and updating your application control policies accordingly. Incorporate threat intelligence to stay ahead of emerging threats and vulnerabilities.",
      },
    },
    essential2: {
      description:
        "Patch Applications is a crucial cybersecurity practice outlined in the Australian Government's Essential Eight framework. This essential focuses on the timely and systematic application of patches to address vulnerabilities present in operating systems and applications. By doing so, organizations can significantly reduce the risk of exploitation by malicious actors who often target unpatched software to gain unauthorized access or cause harm.",
      maturity0: {
        risks:
          "Your organization's current maturity level for Patch Applications is at Level 0, representing No formal patch management process is established.\n\n1. High risk of unpatched vulnerabilities being exploited by cyber threats.\n\n2. Lack of visibility into vulnerable systems, making it difficult to assess and mitigate security risks.",
        steps:
          "Maturity Level 0 to Maturity Level 1:\n\n1. Establish a Formal Patch Management Process: Initiate a structured approach to managing patches by defining roles, responsibilities, and processes.\n\n2. Prioritize Critical Vulnerabilities: Identify critical vulnerabilities with potential business impact and prioritize their patching.\n\n3. Implement Automated Patch Deployment: Introduce automation to deploy patches for operating systems and common applications, reducing manual errors.",
      },
      maturity1: {
        risks:
          "Your organization's current maturity level for Patch Applications is at Level 1, representing there are still vulnerabilities that need addressing.\n\n1. Limited coverage of patch management; vulnerabilities in less critical applications may be overlooked.\n\n2. Absence of a defined patch cycle could lead to inconsistent updates and exposure to emerging threats.",
        steps:
          "Maturity Level 1 to Maturity Level 2:\n\n1. Extend Patch Management to Wider Range: Expand your patch management process to cover a wider array of applications beyond operating systems.\n\n2. Test Environment for Patch Validation: Set up a controlled environment to test patches before deploying them in the production environment.\n\n3. Defined Patch Cycle: Create a clear schedule for patch deployment to ensure consistent updates.",
      },
      maturity2: {
        risks:
          "Your organization's current maturity level for Patch Applications is at Level 2, representing certain risks are persist and should be addressed.\n\n1. Despite improved coverage, compatibility issues might arise during patch deployment, impacting system stability.\n\n2. Manual assessment of vulnerabilities may still lead to slower response times for critical updates.",
        steps:
          "Maturity Level 2 to Maturity Level 3:\n\n1. Continuous Monitoring for Emerging Vulnerabilities: Establish mechanisms to continuously monitor for new vulnerabilities that could impact your environment.\n\n2. Automate Vulnerability Scanning: Implement automation for vulnerability scanning and assessment to accelerate the identification of vulnerabilities.\n\n3. Leverage Threat Intelligence: Incorporate threat intelligence to proactively identify vulnerabilities that might target your specific environment.",
      },
    },
    essential3: {
      description:
        "Configuring Microsoft Office Macro Settings is a critical cybersecurity practice defined in the Australian Government's Essential Eight framework. This essential focuses on managing the execution of macros in Microsoft Office documents, thereby mitigating the risks associated with potentially malicious macros embedded in files. By implementing proper configuration, organizations can significantly reduce the likelihood of macro-based attacks, a common vector for malware delivery.",
      maturity0: {
        risks:
          "Your organization's current maturity level for Configuring Microsoft Office Macro Settings is at Level 0, representing macro settings are not configured, allowing macros to run unchecked by default.\n\n1. High risk of malicious macros executing in Microsoft Office documents, leading to potential malware infection.\n\n2. Limited awareness among employees about the potential dangers of enabling macros.",
        steps:
          "Maturity Level 0 to Maturity Level 1:\n\n1. Disable Macros by Default: Begin by configuring Microsoft Office to disable macros in documents by default.\n\n2. Educate Employees: Raise awareness among employees about the dangers associated with enabling macros and how to make informed decisions.\n\n3. Allow Macros for Trusted Documents: Only permit macros to run in documents that are digitally signed and deemed trustworthy.",
      },
      maturity1: {
        risks:
          "Your organization's current maturity level for Configuring Microsoft Office Macro Settings is at Level 1. This level represents an improved capability compared to Level 0, but there are still vulnerabilities that need addressing.\n\n1. Although macros are disabled by default, users might still enable them without full understanding, leading to inadvertent malware execution.\n\n2. Limited enforcement mechanisms could result in unauthorized macro usage.",
        steps:
          "Maturity Level 1 to Maturity Level 2:\n\n1. Group Policy Enforcement: Implement group policies to consistently enforce macro settings organization-wide.\n\n2. Regular Reviews and Updates: Continuously review and update macro settings based on evolving security best practices.",
      },
      maturity2: {
        risks:
          "Your organization's current maturity level for Configuring Microsoft Office Macro Settings is at Level 2. This level reflects an improved capability in managing macro execution and security compared to Level 1. However, certain risks persist and should be addressed.\n\n1. Inconsistent enforcement across various groups might lead to gaps in macro settings.\n\n2. A lack of proactive update mechanisms could result in outdated configurations.",
        steps:
          "Maturity Level 2 to Maturity Level 3:\n\n1. Advanced Email Filtering: Invest in advanced email filtering and inspection solutions to better identify malicious macros in inbound emails.\n\n2. Application Control for Macros: Use application control to restrict macro execution to approved locations or trusted environments.\n\n3. Employee Training: Provide training to employees on recognizing and reporting suspicious macro-enabled documents, enhancing the organization's human firewall.",
      },
    },
    essential4: {
      description:
        "User Application Hardening is a pivotal cybersecurity practice within the Australian Government's Essential Eight framework. This essential emphasizes the importance of securing user applications towards potential cyber threats. By implementing user application hardening practices, organizations can bolster their defenses against attacks that target user-level vulnerabilities.",
      maturity0: {
        risks:
          "Your organization's present maturity level for User Application Hardening is at Level 0, representing basic awareness is raised among users about safe application usage. However, no specific practices are in place to harden user applications.\n\n1. High risk of user-related vulnerabilities being exploited by cyber threats.\n\n2. Limited understanding of the potential dangers related to insecure application usage.",
        steps:
          "Maturity Level 0 to Maturity Level 1:\n\n1. Educate Users: Raise awareness among users about safe application usage and download practices.\n\n2. Strong Password Policies: Implement strong password policies for application accounts to minimize unauthorized access.\n\n3. Monitor User Behavior: Continuously monitor user application behavior to detect anomalies or potential security breaches.",
      },
      maturity1: {
        risks:
          "Your organization's present maturity level for User Application Hardening is at Level 1. This level represents an improved capability compared to Level 0, but there are still vulnerabilities that need addressing:\n\n1. While user education is emphasized, users might still engage in risky application behavior, potentially exposing vulnerabilities.\n\n2. Manual monitoring of user behavior might not effectively identify subtle signs of compromise.",
        steps:
          "Maturity Level 1 to Maturity Level 2:\n\n1. Multi-Factor Authentication: Enforce multi-factor authentication for critical applications to enhance user authentication security.\n\n2. Application-Level Encryption: Implement encryption mechanisms to protect sensitive data stored within applications.\n\n3. Regular Updates and Patches: Ensure that applications are regularly updated and patched to address security vulnerabilities.",
      },
      maturity2: {
        risks:
          "Your organization's present maturity level for User Application Hardening is at Level 2. This level reflects an improved capability in managing user application security compared to Level 1. However, certain risks persist and should be addressed:\n\n1. Despite multi-factor authentication, sophisticated attacks could still exploit vulnerabilities in applications.\n\n2. A lack of automated update mechanisms might lead to delays in applying crucial security patches.",
        steps:
          "Maturity Level 2 to Maturity Level 3:\n\n1. Application Whitelisting: Implement application whitelisting for critical systems to restrict unauthorized applications.\n\n2. Continuous User Activity Monitoring: Continuously monitor user activity for signs of compromise or unusual behavior.\n\n3. Security Awareness Training: Conduct regular security awareness training for employees to educate them about evolving threats and safe practices.",
      },
    },
    essential5: {
      description:
        "Restricting Administrative Privileges is a pivotal cybersecurity practice within the Australian Government's Essential Eight framework. This essential emphasizes the importance of limiting administrative access to critical systems and resources to mitigate potential insider threats and unauthorized access. By restricting administrative privileges, organizations can significantly reduce the attack surface and potential impact of security breaches.",
      maturity0: {
        risks:
          "Your organization's current maturity level for Restricting Administrative Privileges is at Level 0. This assessment represents your organization's current administrative access is unrestricted, without specific documentation or controls in place.\n\n1. High risk of unauthorized access and potential misuse of administrative privileges.\n\n2. Limited visibility and accountability regarding administrative activities.",
        steps:
          "Maturity Level 0 to Maturity Level 1:\n\n1. Identify and Document Administrative Accounts: Create a comprehensive inventory of administrative accounts and their respective purposes.\n\n2. Strong Password Policies: Enforce strong password policies for administrative accounts to minimize unauthorized access.\n\n3. Separate Administrative and Standard User Accounts: Implement strict separation between administrative and standard user accounts.",
      },
      maturity1: {
        risks:
          "Your organization's current maturity level for Restricting Administrative Privileges is at Level 1. This level represents an improved capability compared to Level 0, but there are still vulnerabilities that need addressing:\n\n1. While administrative accounts are documented, unauthorized access might still occur if strong authentication controls are lacking.\n\n2. Limited separation between administrative and standard user accounts could lead to potential misuse.",
        steps:
          "Maturity Level 1 to Maturity Level 2:\n\n1. Just-in-Time (JIT) Administration: Implement JIT administration to provide elevated privileges only when necessary.\n\n2. Privilege Management Tools: Employ privilege management tools to enforce the principle of least privilege.\n\n3. Monitor and Audit Administrative Access: Regularly monitor and audit administrative access and activities for anomalies or potential misuse.",
      },
      maturity2: {
        risks:
          "Your organization's current maturity level for Restricting Administrative Privileges is at Level 2. This level reflects an improved capability in managing administrative access compared to Level 1. However, certain risks persist and should be addressed:\n\n1. Despite Just-in-Time (JIT) administration, potential delays in granting necessary privileges could impact operational efficiency.\n\n2. Incomplete audit coverage might result in missed unauthorized activities.",
        steps:
          "Maturity Level 2 to Maturity Level 3:\n\n1. Privilege Escalation Detection and Response: Implement capabilities to detect and respond to privilege escalation attempts promptly.\n\n2. Threat Hunting Techniques: Consider employing threat hunting techniques to proactively identify unauthorized access and suspicious activities.\n\n3. Advanced Threat Detection for Lateral Movement: Enhance threat detection mechanisms to identify and respond to lateral movement within the network.",
      },
    },
    essential6: {
      description:
        "Patch Operating Systems is a fundamental cybersecurity practice within the Australian Government's Essential Eight framework. This essential focuses on maintaining the security and stability of operating systems by regularly applying patches to address vulnerabilities. By ensuring timely and comprehensive patching, organizations can significantly reduce the risk of exploitation by malicious actors targeting unpatched systems.",
      maturity0: {
        risks:
          "Your organization's present maturity level for Patching Operating Systems is at Level 0. This assessment reflects high risk of vulnerabilities in operating systems being exploited by cyber threats.\n\n1. Limited visibility into vulnerable systems and potential risks.",
        steps:
          "Maturity Level 0 to Maturity Level 1:\n\n1. Centralized Patch Management System: Establish a centralized system to manage patches for operating systems.\n\n2. Prioritize Patching: Prioritize patch deployment based on criticality and potential impact.\n\n3. Regular System Scans: Regularly scan systems to identify and address missing patches.",
      },
      maturity1: {
        risks:
          "Your organization's present maturity level for Patching Operating Systems is at Level 1. This level represents an improved capability compared to Level 0, but there are still vulnerabilities that need addressing:\n\n1. While patch management is initiated, a lack of automation might lead to delays in applying critical updates.\n\n2. Limited segmentation of the network could result in potential vulnerabilities spreading to critical systems.",
        steps:
          "Maturity Level 1 to Maturity Level 2:\n\n1. Automated Patch Deployment: Implement automation for patch deployment and monitoring.\n\n2. Network Segmentation: Consider segmenting the network to isolate critical systems for better control.\n\n3. Timely Endpoint Patching: Extend timely patching efforts to cover all endpoints, including remote and mobile devices.",
      },
      maturity2: {
        risks:
          "Your organization's present maturity level for Patching Operating Systems is at Level 2. This level reflects an improved capability in managing operating system patches compared to Level 1. However, certain risks persist and should be addressed:\n\n1. Automated patch deployment enhances efficiency, but unanticipated compatibility issues might arise.\n\n2. A lack of focus on remote and mobile devices could lead to security gaps in those areas.",
        steps:
          "Maturity Level 2 to Maturity Level 3:\n\n1. Continuous Monitoring: Implement continuous monitoring to proactively identify vulnerabilities and threats.\n\n2. Threat Intelligence Utilization: Leverage threat intelligence to identify vulnerabilities relevant to your environment.\n\n3. Rapid Response Plan: Establish a well-defined rapid response plan for addressing critical vulnerabilities while minimizing disruption.",
      },
    },
    essential7: {
      description:
        "Multi-factor Authentication (MFA) is a critical cybersecurity practice highlighted in the Australian Government's Essential Eight framework. This essential focuses on enhancing the security of authentication by requiring users to provide multiple forms of verification. By implementing MFA, organizations can significantly reduce the risk of unauthorized access, even if passwords are compromised.",
      maturity0: {
        risks:
          "Your organization's current maturity level for Multi-factor Authentication is at Level 0. This assessment reflects multi-factor authentication is not implemented, and remote access relies solely on passwords.\n\n1. High risk of unauthorized access if passwords are compromised.\n\n2. Limited protection against password-related attacks, such as brute force or phishing.",
        steps:
          "Maturity Level 0 to Maturity Level 1:\n\n1. Implement MFA for Remote Access: Start by implementing multi-factor authentication for remote access.\n\n2. User Education: Educate users about the importance of MFA and guide them on how to use it effectively.\n\n3. Consider MFA for Critical Systems: Extend MFA consideration to critical systems and applications.",
      },
      maturity1: {
        risks:
          "Your organization's current maturity level for Multi-factor Authentication is at Level 1. This level represents an improved capability compared to Level 0, but there are still vulnerabilities that need addressing:\n\n1. While MFA is initiated, user awareness and the scope of MFA might be limited.\n\n2. Critical systems without MFA remain vulnerable to unauthorized access.",
        steps:
          "Maturity Level 1 to Maturity Level 2:\n\n1. Enforce MFA for Remote Access and Privileged Accounts: Enforce MFA for all remote access and accounts with privileged access.\n\n2. SSO Integration: Integrate MFA with single sign-on (SSO) solutions to streamline user experience.\n\n3. Regular MFA Policy Review: Regularly review and update MFA policies based on emerging threats and evolving technologies.",
      },
      maturity2: {
        risks:
          "Your organization's current maturity level for Multi-factor Authentication is at Level 2. This level reflects an improved capability in implementing MFA compared to Level 1. However, certain risks persist and should be addressed:\n\n1. Even with widespread MFA, compromised or stolen devices might still enable unauthorized access.\n2. Lack of timely policy updates could result in vulnerabilities due to evolving threats.",
        steps:
          "Maturity Level 2 to Maturity Level 3:\n\n1. Adaptive Authentication: Implement adaptive authentication that assesses risk factors to determine the level of MFA required.\n\n2. Monitor MFA Logs: Continuously monitor MFA logs for unusual activity or signs of compromise.\n\n3. Biometric Authentication Consideration: Explore the possibility of using biometric authentication for heightened security, considering user privacy and technology feasibility.",
      },
    },
    essential8: {
      description:
        "Regular Backups is a crucial cybersecurity practice within the Australian Government's Essential Eight framework. This essential focuses on preserving the availability and integrity of critical data and systems through consistent backup processes. By implementing robust backup strategies, organizations can mitigate the impact of data loss due to cyber incidents, hardware failures, or other disasters.",
      maturity0: {
        risks:
          "Your organization's current maturity level for Regular Backups is at Level 0. This assessment reflects no regular backup processes are established for critical data and systems.\n\n1. High risk of data loss due to cyber incidents, hardware failures, or other disasters.\n\n2. Limited ability to recover from incidents quickly and efficiently.",
        steps:
          "Maturity Level 0 to Maturity Level 1:\n\n1. Establish Backup Schedule: Start by establishing a regular backup schedule for critical data and systems.\n\n2. Test Backup and Restore Processes: Regularly test backup and restore processes to ensure data integrity and reliability.\n\n3. Secure Offsite Storage: Store backups in a secure offsite location to protect against on-site disasters.",
      },
      maturity1: {
        risks:
          "Your organization's current maturity level for Regular Backups is at Level 1. This level represents an improved capability compared to Level 0, but there are still vulnerabilities that need addressing:\n\n1. While basic backups are in place, untested restore processes might result in data corruption or loss.\n\n2. Depending solely on offsite storage might lead to delays in data recovery.",
        steps:
          "Maturity Level 1 to Maturity Level 2:\n\n1. Automate Backup Process: Implement automation for backup processes to enhance consistency and reliability.\n\n2. Encrypt Backup Data: Implement encryption for backup data to protect confidentiality during storage and transit.\n\n3. Conduct Recovery Drills: Conduct periodic recovery drills to validate the restore process and identify potential issues.",
      },
      maturity2: {
        risks:
          "Your organization's current maturity level for Regular Backups is at Level 2. This level reflects an improved capability in backup management compared to Level 1. However, certain risks persist and should be addressed:\n\n1. Automated backups enhance efficiency, but errors in the backup process could result in inconsistent or incomplete backups.\n\n2. Encryption is effective, but key management and access controls are crucial to avoid unauthorized access.",
        steps:
          "Maturity Level 2 to Maturity Level 3:\n\n1. Continuous Data Protection: Implement continuous data protection mechanisms for real-time backup to reduce data loss windows.\n\n2. Cloud-Based Backup Solutions: Consider leveraging cloud-based backup solutions for scalability, flexibility, and potential cost savings.\n\n3. Integrated Plans: Integrate backup and recovery plans with incident response procedures to streamline recovery efforts during cyber incidents.",
      },
    },
  };

  const essentialNames = {
    essential1: "Application Control",
    essential2: "Patch Applications",
    essential3: "Configure Microsoft Office Macro Settings",
    essential4: "User Application Hardening",
    essential5: "Restrict Administrative Privileges",
    essential6: "Patch Operating Systems",
    essential7: "Multi-Factor Authentication",
    essential8: "Regular Backups",
  };


  const [userResponses, setUserResponses] = useState({});
  const [currentEssential, setcurrentEssential] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [minMaturityLevels, setMinMaturityLevels] = useState({});

  const handleOptionChange = (selectedOption) => {
    // Find the current essential questions based on the current maturity level
    const currentEssentialQuestions =
      questionnaire[`essential${currentEssential}`];
    // Update the user's answer for the current question
    const updatedQuestions = currentEssentialQuestions.map((question, index) =>
      index === currentQuestion
        ? { ...question, choosedOption: selectedOption }
        : question
    );
    // Find the question text for the current question
    const currentQuestionKey = updatedQuestions[currentQuestion].question;
    // Update the userResponses state with the integer value
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [currentQuestionKey]: selectedOption,
    }));
    // Check if it's the last question of the current essential
    questionnaire[`essential${currentEssential}`][currentQuestion][
      "choosedOption"
    ] = selectedOption;

    setMinMaturityLevels((prevMinLevels) => ({
      ...prevMinLevels,
      [`essential${currentEssential}`]: Math.min(
        selectedOption,
        prevMinLevels[`essential${currentEssential}`] !== undefined
          ? prevMinLevels[`essential${currentEssential}`]
          : selectedOption
      ),
    }));

    //conditions
    if (currentQuestion === currentEssentialQuestions.length - 1) {
      setcurrentEssential((prevEssential) => prevEssential + 1);
      setCurrentQuestion(0);
    } else if (currentQuestion < 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      // console.log("----maturity = ",questionnaire[`essential${currentEssential}`][0]["choosedOption"]);
    } else if (currentQuestion >= 1) {
      // console.log("----maturity = ",questionnaire[`essential${currentEssential}`][1]["choosedOption"]);
      const sumofmaturity =
        parseInt(
          questionnaire[`essential${currentEssential}`][0]["choosedOption"]
        ) +
        parseInt(
          questionnaire[`essential${currentEssential}`][1]["choosedOption"]
        );
      // console.log("sum of maturity = ",sumofmaturity);
      if (sumofmaturity >= 3)
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      else {
        setcurrentEssential((prevEssential) => prevEssential + 1);
        setCurrentQuestion(0);
      }
    }
  };

  const currentEssentialQuestions = useMemo(
    () => questionnaire[`essential${currentEssential}`],
    [currentEssential, questionnaire]
  );

  const isQuestionnaireCompleted = !currentEssentialQuestions;


  const generatePDFReport = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [210, 297],
      compress: true,
      lineHeight: 1.2,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
    });
    let pageNumber = 3;
    const a4Width = 210; // Width of A4 in mm
    const a4Height = 297; // Height of A4 in mm
    const imagePath1 = "1-min.png";
    const imagePath2 = "2-min.png";
    const imagePath3 = "3-min.png";
    const logo = "Cyber Ethos Logo.png";
    const bg = "bg.png";
    // Calculate image dimensions to cover the full page
    const imageWidth = a4Width;
    const imageHeight = (a4Width * a4Height) / a4Width; // Maintain aspect ratio
    // Calculate the Y position to center the image vertically
    const imageY = (a4Height - imageHeight) / 2;
    const logoWidth = 53.17; // Adjust as needed
    const logoHeight = 23.82; // Adjust as needed
    const logoX = 10; // X-coordinate (in mm) for the left side margin
    const logoY = 10; // Y-coordinate (in mm) for the top margin
    const addPageNumber = () => {
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255); // Set text color to black
      doc.text(190, doc.internal.pageSize.height - 10, `Page ${pageNumber}`);
      pageNumber++; // Increment page number for the next page
    };
    // Add the image to the PDF
    doc.addImage(imagePath1, "PNG", 0, imageY, imageWidth, imageHeight);
    doc.addPage();
    doc.addImage(imagePath3, "PNG", 0, imageY, imageWidth, imageHeight);
    doc.addPage();
    doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
    doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
    addPageNumber();
    //printing title
    const titleFont = "bold Arial";
    const titleFontSize = 30;
    // const titleText = 'User Assessment Report';
    doc.setFont(titleFont);
    doc.setFontSize(titleFontSize);
    // Set the font color to yellow (RGB: 255, 255, 0)
    doc.setTextColor(251, 205, 50);
    // const titleTextWidth = doc.getTextWidth(titleText);
    // const centerX = (doc.internal.pageSize.width - titleTextWidth) / 2;
    // doc.text(centerX, 20, titleText);

    //printing article
    let y = 20 + logoHeight;
    const maxWidth = doc.internal.pageSize.width - 35;
    const articleContent = `Our Unique Proposition (USP):
Cyber Ethos stands out with its practitioner-led approach and commitment to customers. Our USP revolves around three key pillars:
1) Holistic Cybersecurity Strategies, providing comprehensive programs aligned with business objectives;
2) Translating Complexity into Actionable Insights, making cybersecurity understandable and enabling informed risk decisions; and
3) Empowering Cybersecurity Awareness and Education, bridging the knowledge gap within organizations.

Services Offered:
Our range of cybersecurity services includes managed services for proactive monitoring and incident response, advisory and consulting for tailored guidance, board-level expertise to align cybersecurity with business objectives, audits to identify gaps and compliance requirements, and vulnerability scanning with penetration testing to assess and improve your Cyber posture.

Introduction:
In today's rapidly evolving digital landscape, the security of your organisation's sensitive information and critical assets is paramount. As we embark on this journey of cybersecurity exploration, we are excited to present to you an assessment of your Essential 8 maturity based on your responses to our questionnaire. Our analysis examines the key aspects that directly impact your cybersecurity posture based on your responses. It offers a clear and non-technical understanding of your organisation's current state of cybersecurity preparedness from an Essential 8 perspective. This report aims to empower your decision-making by providing you what Cyber Ethos believes is your current state, from your responses. We hope this will assist you in an informed decision making in fortifying your defences and ensuring a robust cybersecurity foundation.
Thank you for entrusting us with this critical endeavour. We will reach out to you in the coming period to discuss your report and assisting you in safeguarding your digital future.

Understanding the ACSC and Essential 8:
The ACSC, a unit under the Australian Signals Directorate (ASD), plays a pivotal role in bolstering Australia's cybersecurity resilience. The E8 strategies are designed to provide essential guidance to businesses across various sectors. Contrary to common misconceptions, these strategies are not just for large corporations or government entities; they apply to businesses of all sizes, safeguarding their digital assets and sensitive data.

Conclusion:
With Cyber Ethos, businesses gain unparalleled cybersecurity expertise, customized strategies, and holistic solutions. Safeguard your data, secure your future, and gain a competitive edge. Contact us today by visiting our website www.cyberethos.com.au and/or by calling 1800 CETHOS (1800-238-467) and embark on a journey towards fortified cybersecurity and lasting success.
The following is an assessment of your current maturity level
based on your provided responses:
    `;
    let normalFontSize = 13;
    const largerFontSize = 18;
    const fontType = "helvetica";
    const articleLines = doc.splitTextToSize(articleContent, 390);
    let lineHeight = doc.getTextDimensions("M").h; // Use 'M' as a dummy character
    for (let i = 0; i < articleLines.length; i++) {
      const remainingPageSpace = doc.internal.pageSize.height - y;
      if (remainingPageSpace < lineHeight) {
        // Add a new page if remaining space is not enough for the next line
        doc.addPage();
        doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
        doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
        addPageNumber();
        y = 20 + logoHeight; // Reset y position for new page
      }
      if (
        articleLines[i].includes(
          "The following is an assessment of your current maturity level"
        )
      ) {
        doc.addPage();
        doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
        doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
        addPageNumber();
        y = 20 + logoHeight;
      }
      if (
        articleLines[i].includes("Introduction:") ||
        articleLines[i].includes("Understanding the ACSC and Essential 8:") ||
        articleLines[i].includes("Our Unique Proposition (USP):") ||
        articleLines[i].includes("Services Offered:") ||
        articleLines[i].includes("Conclusion:") ||
        articleLines[i].includes("Seeking Assistance:") ||
        articleLines[i].includes(
          "The following is an assessment of your current maturity level"
        ) ||
        articleLines[i].includes("based on your provided responses:")
      ) {
        doc.setFont(fontType);
        doc.setFontSize(largerFontSize);
        doc.setTextColor(251, 205, 50);
      } else {
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(normalFontSize);
      }
      doc.text(14, y, articleLines[i]);
      y += lineHeight;
    }

    doc.setFont(fontType);
    doc.setFontSize(largerFontSize);
    doc.setTextColor(251, 205, 50);
    // Define the positions for user data
    const userDataX = 17;
    let userDataY = y + lineHeight - 5; // Adjust the vertical position as needed

    // Add user data to the PDF
    doc.setTextColor(251, 205, 50);
    doc.text("Name:", userDataX, userDataY);
    doc.setTextColor(255, 255, 255); 
    // doc.setFontSize(normalFontSize);
    doc.text(updatedData.name, userDataX + doc.getTextWidth("Name:") + 5, userDataY);
    
    userDataY += lineHeight + 3;
    
    doc.setFontSize(largerFontSize);
    doc.setTextColor(251, 205, 50); 
    doc.text("Company Name:", userDataX, userDataY);
    
    doc.setTextColor(255, 255, 255); // Set color for the user data (e.g., updatedData.companyName)
    // doc.setFontSize(normalFontSize);
    doc.text(updatedData.companyName, userDataX + doc.getTextWidth("Company Name:") + 5, userDataY);
    
    userDataY += lineHeight+ 3;
    
    doc.setFontSize(largerFontSize);
    doc.setTextColor(251, 205, 50);
    doc.text("Phone:", userDataX, userDataY);
    
    doc.setTextColor(255, 255, 255);
    // doc.setFontSize(normalFontSize);
    doc.text(updatedData.phoneNumber, userDataX + doc.getTextWidth("Phone:") + 5, userDataY);
    
    userDataY += lineHeight+ 3;
    
    doc.setFontSize(largerFontSize);
    doc.setTextColor(251, 205, 50);
    doc.text("Email: ", userDataX, userDataY);
    doc.setTextColor(255, 255, 255);
    // doc.setFontSize(normalFontSize);
    doc.text(updatedData.email, userDataX + doc.getTextWidth("Email:")+ 5, userDataY);
    


    

    //adding table
    const tableMarginTop = 10;
    const tableStartPosition = userDataY + 35 - tableMarginTop;
    const tableElement = document.querySelector("table");
    // const tableHeight = doc.autoTable.previous.finalY + tableMarginTop;
    const tableStyles = {
      theme: "grid", // Use the grid theme for better visibility
      headStyles: {
        fillColor: [33, 31, 31], // Column headers background color (blue)
        textColor: [255, 255, 255], // Column headers text color (white)
        lineColor: [255, 255, 255], // Border color (white)
      },
      styles: {
        fontSize: 12,
        cellPadding: 2,
        valign: "middle",
        halign: "center",
        fillColor: [33, 31, 31], // Table background color (black)
        textColor: [255, 255, 255], // Text color (white)
        lineColor: [255, 255, 255], // Border color (white)
      },
    };
    // Add the table to the PDF with formatting
    doc.autoTable({
      html: tableElement,
      startY: tableStartPosition,
      ...tableStyles,
    });


    //report based on responce
    // Object.entries(userResponses).forEach(([question, response]) => {
    //   const questionText = `Question: ${question}`;
    //   const responseText = `Maturity Level:  ${response}`;

    //   // Apply word wrapping to response text to prevent overflow
    //   const lines = doc.splitTextToSize(responseText, maxWidth+15);
    //   const liness = doc.splitTextToSize(questionText, maxWidth+15);

    //   // Calculate the height of the wrapped text
    //   const lineHeight = doc.getTextDimensions('M').h; // Use 'M' as a dummy character
    //   const wrappedTextHeight = lines.length * lineHeight;
    //   const wrappedTextHeights = liness.length * lineHeight;

    //   if (y + wrappedTextHeight + 10 > doc.internal.pageSize.height) {
    //     // Check if the content will exceed the page height
    //     doc.addPage(); // Add a new page if necessary
    //     doc.addImage(bg, 'PNG', 0, imageY, imageWidth, imageHeight);
    //     doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
    //     addPageNumber();
    //     y = 20 + logoHeight; // Reset the vertical position for new page
    //   }
    //   doc.setTextColor(255, 255, 255);
    //   doc.text(14, y, liness);
    //   y += wrappedTextHeights;
    //   doc.text(14, y + 7, lines);
    //   y += wrappedTextHeight + 20;
    // });
    Object.entries(minMaturityLevels).forEach(([essentialKey, response]) => {
      let maturityLevel = minMaturityLevels[essentialKey] || 0; 
      //let essentialName = essentialNames[essentialKey] || "";
      let essentialDescription = essentialData[essentialKey]?.description || "";
      let essentialRisks = essentialData[essentialKey][`maturity${maturityLevel}`]?.risks || "";
      let improvementSteps = essentialData[essentialKey][`maturity${maturityLevel}`]?.steps || "";
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(normalFontSize);
      lineHeight = doc.getTextDimensions("M").h;
      // console.log(maxWidth)
      // console.log(lineHeight)
      let essentialDescriptionbr = doc.splitTextToSize(essentialDescription,maxWidth + 15);
      let essentialRisksbr = doc.splitTextToSize(essentialRisks, maxWidth + 15);
      let improvementStepsbr = doc.splitTextToSize(improvementSteps,maxWidth + 15);

      let essentialDescriptionLines = essentialDescriptionbr.length * lineHeight;
      let essentialRisksLines = essentialRisksbr.length * lineHeight;
      let improvementStepsLines = improvementStepsbr.length * lineHeight;

      doc.addPage();
      doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
      doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
      addPageNumber();
      y = 20 + logoHeight;

      doc.setFont(fontType);
      doc.setFontSize(largerFontSize);
      doc.setTextColor(251, 205, 50);
      doc.text(`${essentialNames[essentialKey]}`, 12, y);
      y += lineHeight + 5;
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(normalFontSize);
      doc.text(12, y, essentialDescriptionbr);
      y += essentialDescriptionLines + 15;

      doc.setFont(fontType);
      doc.setFontSize(largerFontSize);
      doc.setTextColor(251, 205, 50);
      doc.text("Current Maturity Level and Risks", 12, y);
      y += lineHeight + 5;
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(normalFontSize);
      doc.text(12, y, essentialRisksbr);
      y += essentialRisksLines + 15;

      doc.setFont(fontType);
      doc.setFontSize(largerFontSize);
      doc.setTextColor(251, 205, 50);
      doc.text("Next Steps to Improve", 12, y);
      y += lineHeight + 5;
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(normalFontSize);
      doc.text(12, y, improvementStepsbr);
      y += improvementStepsLines;
    });
    y += 5;
    normalFontSize = 9;
    lineHeight = doc.getTextDimensions("M").h;
    const disclaimerContent = `


Disclaimer: The Essential 8 maturity report provided herewith by Cyber Ethos is based solely on the responses provided by the end user. While our utmost diligence and expertise have been exercised in the creation of this report, it is important to acknowledge that the accuracy and completeness of the findings are contingent upon the accuracy and completeness of the user's responses. As such, Cyber Ethos cannot be held liable for any actions, decisions, or outcomes that may arise from the reliance on this report until a comprehensive and further assessment, conducted by our team, has been undertaken to align the findings with the specific needs and nuances of your organisation's cybersecurity requirements. We strongly recommend engaging us in a more detailed evaluation by our experts to ensure an accurate and tailored cybersecurity maturity assessment.`;
    const disclaimerLines = doc.splitTextToSize(disclaimerContent,maxWidth + 86);
    for (let i = 0; i < disclaimerLines.length; i++) {
      const remainingPageSpace = doc.internal.pageSize.height - y;
      if (remainingPageSpace < lineHeight) {
        doc.addPage();
        doc.addImage(bg, "PNG", 0, imageY, imageWidth, imageHeight);
        doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
        addPageNumber();
        y = 20 + logoHeight; // Reset y position for new page
      }
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(normalFontSize);
      doc.text(14, y, disclaimerLines[i]);
      y += lineHeight;
    }

    doc.addPage();
    doc.addImage(imagePath2, "PNG", 0, imageY, imageWidth, imageHeight);
    return doc.output("blob"); // Return the PDF content as a Blob
  };

  const handleDownloadPDF = () => {
    const pdfBlob = generatePDFReport();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "user_report.pdf";
    link.click();
  };
  
  const navigate = useNavigate();
  useEffect(() => {
    if (isQuestionnaireCompleted) {
      // eslint-disable-next-line
      axios
        .post("https://essential-8backend.azurewebsites.net/form/add", updatedData)
        .then((res) => {
          const addedData = res.data;
          console.log(`POST: user is added`, addedData);
        })
        .catch((err) => {
          console.error(err);
        });
       generatePDFReport();
    }
  });

  useEffect(() => {
    const newUpdatedData = props.userData;
    newUpdatedData["userResponses"] = userResponses;
    setUpdatedData(newUpdatedData);
    // eslint-disable-next-line
    // console.log(props.userData)
    if(!(props.userData.name)){
      navigate('/');
    }
    // eslint-disable-next-line
  }, [props.userData, userResponses]);

  return (
    <div className={classes.App}>
      {isQuestionnaireCompleted ? (
        <div style={{ backgroundColor: "#211F1F" }}>
          <header className={classes.header}>
                <div className={classes['logo-container']}>
                    <img
                        src="/Cyber Ethos Logo.png"
                        alt="Cyber Ethos Logo"
                        width={319.02}
                        height={142.92}
                        className={classes.logo}
                    />
                </div>
            </header>
                    <p className={classes['logo-text']}>Essential 8 Assessment</p>
          <h1 style={{ color: "rgb(251, 205, 50)" }}>
            Congratulations! You have completed the assessment.
          </h1>
          <table style={{ border: "1px solid grey" }}>
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#211F1F",
                    color: "rgb(251, 205, 50)",
                    border: "1px solid grey",
                  }}
                >
                  Strategy #
                </th>
                <th
                  style={{
                    backgroundColor: "#211F1F",
                    color: "rgb(251, 205, 50)",
                    border: "1px solid grey",
                  }}
                >
                  Essential 8 Strategy{" "}
                </th>
                <th
                  style={{
                    backgroundColor: "#211F1F",
                    color: "rgb(251, 205, 50)",
                    border: "1px solid grey",
                  }}
                >
                  Maturity Level (as per your responses)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(minMaturityLevels).map((essentialKey, index) => (
                <tr key={essentialKey}>
                  <td
                    style={{
                      color: "rgb(255, 255, 255)",
                      border: "1px solid grey",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      color: "rgb(255, 255, 255)",
                      border: "1px solid grey",
                    }}
                  >
                    {essentialNames[essentialKey]}
                  </td>
                  <td
                    style={{
                      color: "rgb(255, 255, 255)",
                      border: "1px solid grey",
                    }}
                  >
                    Level {minMaturityLevels[essentialKey]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h4 style={{ color: "rgb(251, 205, 50)" }}>
              For complet assessment download the report:
            </h4>
            <button onClick={handleDownloadPDF}>Download PDF</button>
          </div>
          <div style={{ color: "rgb(251, 205, 50)", marginTop: "20px" }}>
          </div>
          <div style={{color: "rgb(251, 205, 50)"}} >
            <p>
              Phone: 1800 CEthos (1800 238 467) <br />
              Email: <a href="mailto:info@cyberethos.com.au" style={{ color: "rgb(255, 255, 255)" }}>info@cyberethos.com.au</a> <br />
              Facebook: <a href="https://www.fb.com/CyberEthos" style={{ color: "rgb(255, 255, 255)" }}>fb.com/CyberEthos</a> <br />
              LinkedIn: <a href="https://www.linkedin.com/company/CyberEthos" style={{ color: "rgb(255, 255, 255)" }}>linkedin.com/company/CyberEthos</a>
            </p>
            <p style={{ margin: "0", fontSize: "1.2em" }}>
              THANK YOU! WE LOOK FORWARD TO SERVING YOU.
            </p>
            <p className={classes['disclaimer-text']}>
              Disclaimer: The Essential 8 maturity report provided herewith by Cyber Ethos is based solely on the responses provided by the end user. While our utmost diligence and expertise have been exercised in the creation of this report, it is important to acknowledge that the accuracy and completeness of the findings are contingent upon the accuracy and completeness of the user's responses. As such, Cyber Ethos cannot be held liable for any actions, decisions, or outcomes that may arise from the reliance on this report until a comprehensive and further assessment, conducted by our team, has been undertaken to align the findings with the specific needs and nuances of your organization's cybersecurity requirements. We strongly recommend engaging us in a more detailed evaluation by our experts to ensure an accurate and tailored cybersecurity maturity assessment.
            </p>
          </div>
        </div>
      ) : (
        <>
          {currentEssentialQuestions &&
            currentEssentialQuestions.length > 0 && (
              <Question
                question={
                  questionnaire[`essential${currentEssential}`][currentQuestion]
                }
                onOptionChange={(selectedOption) =>
                  handleOptionChange(selectedOption)
                }
              />
            )}
        </>
      )}
    </div>
  );
};

export default Questionnere;
