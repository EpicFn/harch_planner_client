import {
    useEffect,
    useState
}

from 'react'

import {
    BookInfo,
    BookSubject,
    BookTitle,
    DateText,
    StyledWorkBookItem,
} from '@components/DailyPlanner/WorkBookItem/WorkBookItem.style'

import {
    CircularProgressbar,
    buildStyles
} from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'

export default function WorkBookItem({workbook, onClick}) {

    const [animatedProgress,setAnimatedProgress]=useState(0) 
    
    useEffect(()=> {
        const timeout=setTimeout(()=> {
            setAnimatedProgress(workbook.progress)
        }, 300) // 300ms 후에 실제 progress 값으로 전환
        return ()=> clearTimeout(timeout)
    }, [workbook.progress]) 
    
    return (
        <StyledWorkBookItem onClick= {onClick}> 
            <div style= {{
                height: '100%',
                width: '70px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
            }}> 
                <CircularProgressbar value= {animatedProgress} text= {`${animatedProgress}%`} 
                    styles= {
                        buildStyles({
                            pathColor: '#ff6b6b', // 진행도 색상
                            textColor: '#000',
                            trailColor: '#d6d6d6', // 남은 진행도 색상
                            textSize: '1.5rem',
                            pathTransitionDuration: 0.5,
                        })
                    }
                    round= {true} strokeWidth= {10}
                /> 
            </div> 
            <BookInfo> 
                <BookTitle> 
                    {workbook.name}
                </BookTitle>
                <BookSubject> 
                    {workbook.subject}
                </BookSubject> 
                <DateText> 
                    {workbook.date}
                </DateText> 
            </BookInfo>
        </StyledWorkBookItem>
    )
}