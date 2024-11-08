import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import SuccessTickIcon from "../icons/SuccessTickIcon";
import TrashIcon from "../icons/TrashIcon";
import { useUploadExcelFileMutation } from "../../features/cards/cardsApi.js";

const types = [
  {
    id: 1,
    name: "מטבח",
    icon: () => (
      <svg viewBox="0 0 20 20" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1.21875 0.120911C0.949219 0.253723 0.8125 0.398254 0.679688 0.683411L0.585938 0.878723V2.62091C0.585938 4.57794 0.585938 4.58185 0.867188 4.90216C0.953125 4.99982 1.11719 5.12872 1.22656 5.18732L1.42578 5.29279H10H18.5742L18.7734 5.18732C18.8828 5.12872 19.0469 4.99982 19.1328 4.90216C19.4141 4.58185 19.4141 4.57794 19.4141 2.62091V0.878723L19.3203 0.683411C19.1875 0.398254 19.0508 0.253723 18.7812 0.120911L18.543 -0.000183105H10H1.45703L1.21875 0.120911ZM6.44531 2.65607V4.10138H4.12109H1.79688V2.65607V1.21075H4.12109H6.44531V2.65607ZM12.3438 2.65607V4.10138H10H7.65625V2.65607V1.21075H10H12.3438V2.65607ZM18.2031 2.65607V4.10138H15.8789H13.5547V2.65607V1.21075H15.8789H18.2031V2.65607Z" fill="currentcolor"></path><path d="M12.668 6.51935C12.5781 6.56232 12.4844 6.63654 12.4531 6.68732C12.4258 6.73419 12.2344 7.22638 12.0273 7.77325L11.6484 8.76935L11.3203 8.79279C10.7891 8.82794 10.5859 9.00763 10.5859 9.43341C10.5859 9.64825 10.5938 9.66779 10.7578 9.82794L10.9258 9.99982H14.7031H18.4805L18.6445 9.84747C18.8047 9.69513 18.8086 9.68732 18.8086 9.4256C18.8086 8.96466 18.6289 8.82013 18.0352 8.79669C17.6992 8.78107 17.6562 8.77325 17.6758 8.71466C18.0039 7.88654 18.2422 7.18732 18.2422 7.06232C18.2422 6.65997 17.8906 6.37872 17.5 6.46466C17.2148 6.52716 17.1484 6.64044 16.7344 7.75372L16.3477 8.78888H15.832C15.5469 8.78888 15.3125 8.78107 15.3125 8.76935C15.3125 8.76154 15.4453 8.39825 15.6055 7.96857C15.7695 7.52716 15.8984 7.12482 15.8984 7.04669C15.8984 6.74591 15.5977 6.44513 15.3008 6.44513C15.1523 6.44513 14.957 6.53497 14.8516 6.64825C14.8008 6.70685 14.5977 7.18732 14.3789 7.75763L14 8.76935L13.4844 8.78107C13.1992 8.78497 12.9688 8.77716 12.9688 8.75763C12.9688 8.742 13.1016 8.367 13.2656 7.9295C13.5117 7.27325 13.5586 7.10529 13.543 6.97638C13.4883 6.57013 13.0508 6.33966 12.668 6.51935Z" fill="currentcolor"></path><path d="M3.05469 7.05841C3.00391 7.07013 2.89453 7.14435 2.8125 7.22638C2.62109 7.41778 2.60156 7.54669 2.625 8.33575C2.64062 8.78497 2.66406 8.98028 2.72266 9.14825L2.80078 9.37482H2.28906C1.65234 9.37872 1.51172 9.40997 1.33203 9.58575C1.19531 9.72247 1.19141 9.7381 1.19141 10.0037C1.19141 10.2772 1.19141 10.2811 1.35156 10.4295C1.48438 10.5506 1.55078 10.5818 1.72266 10.6053C1.83984 10.617 3.26562 10.6248 4.89062 10.617C7.82031 10.6053 7.84766 10.6053 7.95703 10.5233C8.33984 10.2381 8.33984 9.76153 7.95703 9.47638C7.85938 9.40216 7.78125 9.39435 7.23047 9.37872L6.61719 9.367L6.69141 9.14435C6.75391 8.97247 6.77344 8.78497 6.78906 8.26935C6.80859 7.50763 6.76953 7.33966 6.53125 7.15607L6.39453 7.0506L4.76953 7.04669C3.875 7.04278 3.10547 7.04669 3.05469 7.05841ZM5.57031 8.49982C5.51562 9.04278 5.1875 9.37482 4.70703 9.37482C4.22656 9.37482 3.89062 9.03107 3.83984 8.49591L3.81641 8.242H4.70703H5.59766L5.57031 8.49982Z" fill="currentcolor"></path><path d="M1.30859 11.8358C1.08203 11.9217 0.8125 12.1717 0.6875 12.4022C0.605469 12.5584 0.605469 12.5662 0.59375 15.8358L0.585938 19.1092L0.675781 19.3123C0.808594 19.6014 0.949219 19.7459 1.21875 19.8787L1.45703 19.9998H10H18.543L18.7812 19.8787C19.0508 19.7459 19.1914 19.6014 19.3242 19.3123L19.4141 19.1092L19.4062 15.8358C19.3945 12.5662 19.3945 12.5584 19.3125 12.4022C19.1836 12.1639 18.918 11.9217 18.6836 11.8358C18.4766 11.7576 18.375 11.7576 9.98828 11.7615C1.68359 11.7615 1.5 11.7615 1.30859 11.8358ZM18.2031 13.535V14.1014H10H1.79688V13.535V12.9686H10H18.2031V13.535ZM6.44531 17.0506V18.7889H4.12109H1.79688V17.0506V15.3123H4.12109H6.44531V17.0506ZM12.3438 17.0506V18.7889H10H7.65625V17.0506V15.3123H10H12.3438V17.0506ZM18.2031 17.0506V18.7889H15.8789H13.5547V17.0506V15.3123H15.8789H18.2031V17.0506Z" fill="currentcolor"></path></svg>
    ),
  },
  {
    id: 2,
    name: "ארון קיר",
    icon: () => (
      <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
        <path d="M1.85156 0.0937061C1.61719 0.203081 1.40234 0.406206 1.28125 0.636675L1.19141 0.800737L1.17969 8.45699C1.16797 17.1718 1.13672 16.3359 1.51953 16.7226C1.83594 17.0351 1.96094 17.0703 2.82031 17.0703H3.51562V17.9257V18.7851L2.25781 18.7968C0.859375 18.8085 0.820312 18.8164 0.664062 19.0742C0.558594 19.2421 0.558594 19.5859 0.664062 19.7539C0.824219 20.0195 0.0234375 20 10.0078 20C18.8984 20 19.0469 20 19.168 19.9218C19.3359 19.8203 19.4141 19.6562 19.4141 19.4062C19.4141 19.1601 19.3203 18.9804 19.1328 18.8789C19.0195 18.8164 18.8711 18.8085 17.7461 18.7968L16.4844 18.7851V17.9257V17.0703H17.1797C18.0391 17.0703 18.1641 17.0351 18.4805 16.7226C18.8633 16.3359 18.832 17.1718 18.8203 8.45699C18.8086 1.03902 18.8047 0.796831 18.7344 0.664019C18.5898 0.398394 18.4336 0.238237 18.1953 0.12105L17.957 -4.3869e-05H10.0039H2.05078L1.85156 0.0937061ZM17.6172 3.98433V6.75777H17.3438H17.0703V4.75386C17.0703 2.82808 17.0664 2.74996 16.9922 2.62496C16.7578 2.24214 16.1719 2.24996 15.9492 2.64058C15.8594 2.79292 15.8594 2.79683 15.8594 4.77339V6.75777H15.4297H15V4.75386C15 2.82808 14.9961 2.74996 14.9219 2.62496C14.6914 2.24605 14.1719 2.24996 13.8906 2.62886C13.8086 2.73824 13.8086 2.78121 13.7969 4.74996L13.7852 6.75777H12.9102C12.4258 6.75777 12.0312 6.75386 12.0312 6.74605C12.0312 6.74214 12.3047 5.92183 12.6367 4.92183C13.0625 3.64839 13.2422 3.05464 13.2422 2.92964C13.2422 2.59761 12.9883 2.34371 12.6641 2.34371C12.4648 2.34371 12.25 2.43355 12.168 2.55074C12.1367 2.59761 11.8008 3.56246 11.4219 4.69527L10.7344 6.75777H6.55859H2.38281V3.98433V1.21089H10H17.6172V3.98433ZM17.6172 9.70699V11.4453H10H2.38281V9.70699V7.96871H10H17.6172V9.70699ZM17.6172 14.2578V15.8593H10H2.38281V14.2578V12.6562H10H17.6172V14.2578ZM15.2734 17.9296V18.789H10H4.72656V17.9296V17.0703H10H15.2734V17.9296Z" fill="currentcolor"></path>
        <path d="M8.92973 8.82806C8.45317 8.9765 8.36723 9.6601 8.79692 9.92181C8.91801 9.99603 8.99613 9.99994 10 9.99994C11.0039 9.99994 11.0821 9.99603 11.2032 9.92181C11.5821 9.69135 11.5782 9.17181 11.1993 8.89056C11.0938 8.81244 11.0352 8.80853 10.0664 8.80072C9.50395 8.79681 8.99223 8.80853 8.92973 8.82806Z" fill="currentcolor"></path>
        <path d="M8.83211 13.5859C8.6368 13.6835 8.54305 13.832 8.52743 14.0703C8.50789 14.332 8.60164 14.5156 8.81258 14.6367C8.96102 14.7226 9.00008 14.7265 10.0001 14.7265C11.0001 14.7265 11.0391 14.7226 11.1876 14.6367C11.3985 14.5156 11.4923 14.332 11.4727 14.0703C11.4571 13.832 11.3634 13.6835 11.1681 13.5859C11.0509 13.5234 10.9102 13.5156 10.0001 13.5156C9.08993 13.5156 8.9493 13.5234 8.83211 13.5859Z" fill="currentcolor"></path>
      </svg>
    ),
  },
  {
    id: 3,
    name: "ארון רחצה",
    icon: () => (
      <svg viewBox="0 0 20 20" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1.85156 0.0937061C1.61719 0.203081 1.40234 0.406206 1.28125 0.636675L1.19141 0.800737L1.17969 8.45699C1.16797 17.1718 1.13672 16.3359 1.51953 16.7226C1.83594 17.0351 1.96094 17.0703 2.82031 17.0703H3.51562V17.9257V18.7851L2.25781 18.7968C0.859375 18.8085 0.820312 18.8164 0.664062 19.0742C0.558594 19.2421 0.558594 19.5859 0.664062 19.7539C0.824219 20.0195 0.0234375 20 10.0078 20C18.8984 20 19.0469 20 19.168 19.9218C19.3359 19.8203 19.4141 19.6562 19.4141 19.4062C19.4141 19.1601 19.3203 18.9804 19.1328 18.8789C19.0195 18.8164 18.8711 18.8085 17.7461 18.7968L16.4844 18.7851V17.9257V17.0703H17.1797C18.0391 17.0703 18.1641 17.0351 18.4805 16.7226C18.8633 16.3359 18.832 17.1718 18.8203 8.45699C18.8086 1.03902 18.8047 0.796831 18.7344 0.664019C18.5898 0.398394 18.4336 0.238237 18.1953 0.12105L17.957 -4.3869e-05H10.0039H2.05078L1.85156 0.0937061ZM17.6172 3.98433V6.75777H17.3438H17.0703V4.75386C17.0703 2.82808 17.0664 2.74996 16.9922 2.62496C16.7578 2.24214 16.1719 2.24996 15.9492 2.64058C15.8594 2.79292 15.8594 2.79683 15.8594 4.77339V6.75777H15.4297H15V4.75386C15 2.82808 14.9961 2.74996 14.9219 2.62496C14.6914 2.24605 14.1719 2.24996 13.8906 2.62886C13.8086 2.73824 13.8086 2.78121 13.7969 4.74996L13.7852 6.75777H12.9102C12.4258 6.75777 12.0312 6.75386 12.0312 6.74605C12.0312 6.74214 12.3047 5.92183 12.6367 4.92183C13.0625 3.64839 13.2422 3.05464 13.2422 2.92964C13.2422 2.59761 12.9883 2.34371 12.6641 2.34371C12.4648 2.34371 12.25 2.43355 12.168 2.55074C12.1367 2.59761 11.8008 3.56246 11.4219 4.69527L10.7344 6.75777H6.55859H2.38281V3.98433V1.21089H10H17.6172V3.98433ZM17.6172 9.70699V11.4453H10H2.38281V9.70699V7.96871H10H17.6172V9.70699ZM17.6172 14.2578V15.8593H10H2.38281V14.2578V12.6562H10H17.6172V14.2578ZM15.2734 17.9296V18.789H10H4.72656V17.9296V17.0703H10H15.2734V17.9296Z" fill="currentcolor"></path><path d="M8.92973 8.82806C8.45317 8.9765 8.36723 9.6601 8.79692 9.92181C8.91801 9.99603 8.99613 9.99994 10 9.99994C11.0039 9.99994 11.0821 9.99603 11.2032 9.92181C11.5821 9.69135 11.5782 9.17181 11.1993 8.89056C11.0938 8.81244 11.0352 8.80853 10.0664 8.80072C9.50395 8.79681 8.99223 8.80853 8.92973 8.82806Z" fill="currentcolor"></path><path d="M8.83211 13.5859C8.6368 13.6835 8.54305 13.832 8.52743 14.0703C8.50789 14.332 8.60164 14.5156 8.81258 14.6367C8.96102 14.7226 9.00008 14.7265 10.0001 14.7265C11.0001 14.7265 11.0391 14.7226 11.1876 14.6367C11.3985 14.5156 11.4923 14.332 11.4727 14.0703C11.4571 13.832 11.3634 13.6835 11.1681 13.5859C11.0509 13.5234 10.9102 13.5156 10.0001 13.5156C9.08993 13.5156 8.9493 13.5234 8.83211 13.5859Z" fill="currentcolor"></path></svg>
    ),
  },
  {
    id: 4,
    name: " חיפוי קיר",
    icon: () => (
      <svg viewBox="0 0 20 20" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1.85156 0.0937061C1.61719 0.203081 1.40234 0.406206 1.28125 0.636675L1.19141 0.800737L1.17969 8.45699C1.16797 17.1718 1.13672 16.3359 1.51953 16.7226C1.83594 17.0351 1.96094 17.0703 2.82031 17.0703H3.51562V17.9257V18.7851L2.25781 18.7968C0.859375 18.8085 0.820312 18.8164 0.664062 19.0742C0.558594 19.2421 0.558594 19.5859 0.664062 19.7539C0.824219 20.0195 0.0234375 20 10.0078 20C18.8984 20 19.0469 20 19.168 19.9218C19.3359 19.8203 19.4141 19.6562 19.4141 19.4062C19.4141 19.1601 19.3203 18.9804 19.1328 18.8789C19.0195 18.8164 18.8711 18.8085 17.7461 18.7968L16.4844 18.7851V17.9257V17.0703H17.1797C18.0391 17.0703 18.1641 17.0351 18.4805 16.7226C18.8633 16.3359 18.832 17.1718 18.8203 8.45699C18.8086 1.03902 18.8047 0.796831 18.7344 0.664019C18.5898 0.398394 18.4336 0.238237 18.1953 0.12105L17.957 -4.3869e-05H10.0039H2.05078L1.85156 0.0937061ZM17.6172 3.98433V6.75777H17.3438H17.0703V4.75386C17.0703 2.82808 17.0664 2.74996 16.9922 2.62496C16.7578 2.24214 16.1719 2.24996 15.9492 2.64058C15.8594 2.79292 15.8594 2.79683 15.8594 4.77339V6.75777H15.4297H15V4.75386C15 2.82808 14.9961 2.74996 14.9219 2.62496C14.6914 2.24605 14.1719 2.24996 13.8906 2.62886C13.8086 2.73824 13.8086 2.78121 13.7969 4.74996L13.7852 6.75777H12.9102C12.4258 6.75777 12.0312 6.75386 12.0312 6.74605C12.0312 6.74214 12.3047 5.92183 12.6367 4.92183C13.0625 3.64839 13.2422 3.05464 13.2422 2.92964C13.2422 2.59761 12.9883 2.34371 12.6641 2.34371C12.4648 2.34371 12.25 2.43355 12.168 2.55074C12.1367 2.59761 11.8008 3.56246 11.4219 4.69527L10.7344 6.75777H6.55859H2.38281V3.98433V1.21089H10H17.6172V3.98433ZM17.6172 9.70699V11.4453H10H2.38281V9.70699V7.96871H10H17.6172V9.70699ZM17.6172 14.2578V15.8593H10H2.38281V14.2578V12.6562H10H17.6172V14.2578ZM15.2734 17.9296V18.789H10H4.72656V17.9296V17.0703H10H15.2734V17.9296Z" fill="currentcolor"></path><path d="M8.92973 8.82806C8.45317 8.9765 8.36723 9.6601 8.79692 9.92181C8.91801 9.99603 8.99613 9.99994 10 9.99994C11.0039 9.99994 11.0821 9.99603 11.2032 9.92181C11.5821 9.69135 11.5782 9.17181 11.1993 8.89056C11.0938 8.81244 11.0352 8.80853 10.0664 8.80072C9.50395 8.79681 8.99223 8.80853 8.92973 8.82806Z" fill="currentcolor"></path><path d="M8.83211 13.5859C8.6368 13.6835 8.54305 13.832 8.52743 14.0703C8.50789 14.332 8.60164 14.5156 8.81258 14.6367C8.96102 14.7226 9.00008 14.7265 10.0001 14.7265C11.0001 14.7265 11.0391 14.7226 11.1876 14.6367C11.3985 14.5156 11.4923 14.332 11.4727 14.0703C11.4571 13.832 11.3634 13.6835 11.1681 13.5859C11.0509 13.5234 10.9102 13.5156 10.0001 13.5156C9.08993 13.5156 8.9493 13.5234 8.83211 13.5859Z" fill="currentcolor"></path></svg>
    ),
  },
  {
    id: 5,
    name: "מזנון",
    icon: () => (
      <svg viewBox="0 0 20 20" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1.85156 0.0937061C1.61719 0.203081 1.40234 0.406206 1.28125 0.636675L1.19141 0.800737L1.17969 8.45699C1.16797 17.1718 1.13672 16.3359 1.51953 16.7226C1.83594 17.0351 1.96094 17.0703 2.82031 17.0703H3.51562V17.9257V18.7851L2.25781 18.7968C0.859375 18.8085 0.820312 18.8164 0.664062 19.0742C0.558594 19.2421 0.558594 19.5859 0.664062 19.7539C0.824219 20.0195 0.0234375 20 10.0078 20C18.8984 20 19.0469 20 19.168 19.9218C19.3359 19.8203 19.4141 19.6562 19.4141 19.4062C19.4141 19.1601 19.3203 18.9804 19.1328 18.8789C19.0195 18.8164 18.8711 18.8085 17.7461 18.7968L16.4844 18.7851V17.9257V17.0703H17.1797C18.0391 17.0703 18.1641 17.0351 18.4805 16.7226C18.8633 16.3359 18.832 17.1718 18.8203 8.45699C18.8086 1.03902 18.8047 0.796831 18.7344 0.664019C18.5898 0.398394 18.4336 0.238237 18.1953 0.12105L17.957 -4.3869e-05H10.0039H2.05078L1.85156 0.0937061ZM17.6172 3.98433V6.75777H17.3438H17.0703V4.75386C17.0703 2.82808 17.0664 2.74996 16.9922 2.62496C16.7578 2.24214 16.1719 2.24996 15.9492 2.64058C15.8594 2.79292 15.8594 2.79683 15.8594 4.77339V6.75777H15.4297H15V4.75386C15 2.82808 14.9961 2.74996 14.9219 2.62496C14.6914 2.24605 14.1719 2.24996 13.8906 2.62886C13.8086 2.73824 13.8086 2.78121 13.7969 4.74996L13.7852 6.75777H12.9102C12.4258 6.75777 12.0312 6.75386 12.0312 6.74605C12.0312 6.74214 12.3047 5.92183 12.6367 4.92183C13.0625 3.64839 13.2422 3.05464 13.2422 2.92964C13.2422 2.59761 12.9883 2.34371 12.6641 2.34371C12.4648 2.34371 12.25 2.43355 12.168 2.55074C12.1367 2.59761 11.8008 3.56246 11.4219 4.69527L10.7344 6.75777H6.55859H2.38281V3.98433V1.21089H10H17.6172V3.98433ZM17.6172 9.70699V11.4453H10H2.38281V9.70699V7.96871H10H17.6172V9.70699ZM17.6172 14.2578V15.8593H10H2.38281V14.2578V12.6562H10H17.6172V14.2578ZM15.2734 17.9296V18.789H10H4.72656V17.9296V17.0703H10H15.2734V17.9296Z" fill="currentcolor"></path><path d="M8.92973 8.82806C8.45317 8.9765 8.36723 9.6601 8.79692 9.92181C8.91801 9.99603 8.99613 9.99994 10 9.99994C11.0039 9.99994 11.0821 9.99603 11.2032 9.92181C11.5821 9.69135 11.5782 9.17181 11.1993 8.89056C11.0938 8.81244 11.0352 8.80853 10.0664 8.80072C9.50395 8.79681 8.99223 8.80853 8.92973 8.82806Z" fill="currentcolor"></path><path d="M8.83211 13.5859C8.6368 13.6835 8.54305 13.832 8.52743 14.0703C8.50789 14.332 8.60164 14.5156 8.81258 14.6367C8.96102 14.7226 9.00008 14.7265 10.0001 14.7265C11.0001 14.7265 11.0391 14.7226 11.1876 14.6367C11.3985 14.5156 11.4923 14.332 11.4727 14.0703C11.4571 13.832 11.3634 13.6835 11.1681 13.5859C11.0509 13.5234 10.9102 13.5156 10.0001 13.5156C9.08993 13.5156 8.9493 13.5234 8.83211 13.5859Z" fill="currentcolor"></path></svg>
    ),
  },
];


const UpLoadDropZone = ({ setData, file, setFile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected, setSelected] = useState(types[0]); 
  const [uploadFile, { data, isLoading, isError, isSuccess }] =
    useUploadExcelFileMutation();
  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const openModal = () => {
    document.getElementById("newModal").showModal();
  };

  const toggleDropdown = () => {
    setIsOpen((prevValue) => !prevValue);
    setFile(null);
    setData(null);
  };
  const toggleDropdown2 = () => {
    setIsOpen2((prevValue) => !prevValue);
  };
  
  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen2(false); 
  };
  const handleRemoveFile = () => {
    setFile(null);
    setData(null);
  };
  const handleClose = () => {
    setIsOpen(false);
    setFile(null);
    setData(null);
  };
  const handleOnclick = (file) => {
    uploadFile(file);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isLoading) {
      document.getElementById("loadingModal").showModal();
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) {
      document.getElementById("loadingModal").close();
      setData(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      document.getElementById("loadingModal").close();
      document.getElementById("ErrorModal").showModal();
      setFile(null);
    }
  }, [isError]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      customerName: formData.get("customerName"),
      installationDeadline: formData.get("installationDeadline"),
      orderDate: formData.get("orderDate"),
      type:selected.name,
      phone1: formData.get("phone1"),
      phone2: formData.get("phone2"),
      street: formData.get("street"),
      city: formData.get("city"),
      apartment: formData.get("apartment"),
      floor: formData.get("floor"),
    };

    try {
      const response = await fetch("http://localhost:9001/api/v1/order", { // TODO: change to production url
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      alert("Success!");
    } catch (error) {
      alert("Error!");
    }
  };

 
  return (
    <div className="dropdown">
      <div
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 bg-white border-2  border-gray-200 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-700 hidden sm:block">
            העלה קובץ
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            className="w-6 h-6 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
            ></path>
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="bg-white border-dashed border  border-[#E8E8E8] rounded z-[1] w-96 shadow absolute top-full mt-4 left-0">
          <div className="flex justify-end px-4 pt-2">
            <button
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <hr className="mx-4 mt-1" />
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className="p-4 cursor-pointer" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="flex items-center gap-4">
                    <button className="btn btn-outline border-gray-300">
                      בחר קבצים
                    </button>
                    <svg
                      width="26"
                      height="18"
                      viewBox="0 0 20 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.125 5.36668C15.5583 2.49168 13.0333 0.333344 10 0.333344C7.59167 0.333344 5.5 1.70001 4.45833 3.70001C1.95 3.96668 0 6.09168 0 8.66668C0 11.425 2.24167 13.6667 5 13.6667H15.8333C18.1333 13.6667 20 11.8 20 9.50001C20 7.30001 18.2917 5.51668 16.125 5.36668ZM11.6667 7.83334V11.1667H8.33333V7.83334H5.83333L9.70833 3.95834C9.875 3.79168 10.1333 3.79168 10.3 3.95834L14.1667 7.83334H11.6667Z"
                        fill="#969696"
                      />
                    </svg>
                    <span>זרוק קבצים כאן...</span>
                  </div>
                </div>

                <div className="p-4 new">
                  <button
                    onClick={openModal}
                    className="btn btn-outline border-gray-300"
                  >
                    צור תוכנית באופן ידני
                  </button>
                </div>
                <dialog id="newModal" className="max-w-3xl p-14 rounded-md">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("newModal").close()
                      }
                      className="close-button mr-auto btn btn-sm btn-circle btn-ghost text-xl text-[#84818A] "
                    >
                      <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
                    </button>
                  </div>
                  <hr className="h-px my-8 bg-gray-200 border-0 mt-8" />
                  <form onSubmit={handleFormSubmit}>
                    <div className="<div grid grid-cols-1 mb-28 sm:grid-cols-2 md:grid-cols-3 gap-6 text-[#040415]></div>">
                      <div className="form-control w-full max-w-xs">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                          שם
                        </label>
                        <input
                          name="customerName"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="text"
                          required
                        />
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                          דדליין להתקנה
                        </label>
                        <input
                          name="installationDeadline"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="date"
                          required
                        />
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                          תאריך הזמנה
                        </label>
                        <input
                          name="orderDate"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="date"
                          required
                        />
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                          סוג
                        </label>
                        <div
        className={`flex justify-center relative font-medium input border-2 ${
          isOpen2 ? "border-[#00A5FF] text-[#00A5FF]" : "border-[#ebeaed]"
        } shadow-sm p-0 input-bordered w-full text-right rounded-md`}
      >
                          <div
                            onClick={toggleDropdown2}
                            className="flex items-center w-full gap-2 mx-3  bg-white  cursor-pointer hover:bg-gray-50"
                          >
                            {selected.icon()} {selected.name}
                            <svg
                              className="w-4 h-4 ml-2 mr-auto"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          {isOpen2 && (
                            <ul className="absolute top-10 z-10 w-full bg-white border-[#ebeaed] border-2 shadow-lg rounded-md mt-3 px-3 py-4 flex flex-col gap-3">
                              {types.map((item) => (
                                <li
                                  key={item.id}
                                  onClick={() => handleSelect(item)}
                                  className="p-2 border border-[#ebeaed] group hover:bg-[#D2EFFF] hover:text-[#00A5FF] font-medium rounded-md shadow-sm cursor-pointer flex flex-row gap-[6px] items-center"
                                >
                                  <span className="w-7 h-7 bg-[#EAE9EC] group-hover:bg-[#00a6ff27] p-[6px] rounded-full flex items-center justify-center">{item.icon()}</span> {item.name}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {/* <input
                          name="type"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="text"
                          required
                        /> */}
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                          1 מספר טלפון
                        </label>
                        <input
                          name="phone1"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="tel"
                          required
                        />
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                          2 מספר טלפון
                        </label>
                        <input
                          name="phone2"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="tel"
                        />
                      </div>

                      <div className="form-control w-full max-w-xs">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                        רחוב
                        </label>
                        <input
                          name="street"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="text"
                          required
                        />
                      </div>
                      <div className="form-control w-full max-w-xs">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                        עיר
                        </label>
                        <input
                          name="city"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="text"
                          required
                        />
                      </div>
                      <div className="flex gap-5 w-full max-w-xs">
                      <div className="form-control w-full max-w-24">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                        דירה
                        </label>
                        <input
                          name="apartment"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="text"
                          required
                        />
                      </div>
                      <div className="form-control w-full max-w-24">
                        <label className="text-[#84818A] font-semibold label-text pb-2">
                        קומה
                        </label>
                        <input
                          name="floor"
                          className="font-medium border-[#ebeaed] border-2 focus:outline-none focus:text-[#00A5FF] focus:border-[#00A5FF] shadow-sm input input-bordered w-full max-w-xs text-right"
                          type="text"
                          required
                        />
                      </div>
                     </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        className="btn px-12 btn-primary text-white text-sm font-semibold drawer-button"
                        type="submit"
                      >
                        שמור
                      </button>
                    </div>
                  </form>
                </dialog>
              </section>
            )}
          </Dropzone>
          <hr className="mb-3 mx-4" />
          {file && (
            <>
              <div className="px-4 pb-4 flex justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[#969696]">{file.name}</span>
                  <SuccessTickIcon className="w-4 h-4 text-[#0085FF]" />
                </div>
                <div onClick={handleRemoveFile} className="cursor-pointer">
                  <TrashIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="px-4 pb-2">
                <button
                  onClick={() => handleOnclick(file)}
                  className="btn px-12 btn-primary text-white text-sm font-semibold "
                >
                  שלח
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UpLoadDropZone;
