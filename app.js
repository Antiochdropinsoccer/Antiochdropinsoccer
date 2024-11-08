{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', () => \{\
    const dateTimeInput = document.getElementById('date-time');\
    const loadButton = document.getElementById('load-participants');\
    const participantList = document.getElementById('participant-ul');\
    const nameInput = document.getElementById('name');\
    const addButton = document.getElementById('add-participant');\
\
    let currentDateTime = '';\
\
    loadButton.addEventListener('click', () => \{\
        currentDateTime = dateTimeInput.value;\
        if (!currentDateTime) \{\
            alert('Please select a date and time.');\
            return;\
        \}\
        loadParticipants();\
    \});\
\
    addButton.addEventListener('click', () => \{\
        const name = nameInput.value.trim();\
        if (!name || !currentDateTime) \{\
            alert('Please enter your name and select a date/time.');\
            return;\
        \}\
\
        const participants = JSON.parse(localStorage.getItem(currentDateTime)) || [];\
        if (!participants.includes(name)) \{\
            participants.push(name);\
            localStorage.setItem(currentDateTime, JSON.stringify(participants));\
            loadParticipants();\
        \} else \{\
            alert('You are already signed up!');\
        \}\
        nameInput.value = '';\
    \});\
\
    function loadParticipants() \{\
        const participants = JSON.parse(localStorage.getItem(currentDateTime)) || [];\
        participantList.innerHTML = '';\
        participants.forEach((name, index) => \{\
            const li = document.createElement('li');\
            li.textContent = name;\
            const removeBtn = document.createElement('button');\
            removeBtn.textContent = 'Remove';\
            removeBtn.addEventListener('click', () => \{\
                participants.splice(index, 1);\
                localStorage.setItem(currentDateTime, JSON.stringify(participants));\
                loadParticipants();\
            \});\
            li.appendChild(removeBtn);\
            participantList.appendChild(li);\
        \});\
    \}\
\});\
}