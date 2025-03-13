import { MultiValueBarContainer, MultiValueBarItem } from "./MultiValueBar.style";
//color, value, size


const MultiValueBar = ({ datas }) => {

    const totalSize = datas.reduce((acc, cur) => acc + cur.size, 0);

    
    return (
        <MultiValueBarContainer>
            {
                datas.map((data, index) => (
                    <MultiValueBarItem 
                    key={index} 
                    width={(data.size/totalSize * 100) + '%'} 
                    backgroundColor={data.color} />
                ))
            }

        </MultiValueBarContainer>
    );
}

export default MultiValueBar;