// modEdit_main.js
document.addEventListener('DOMContentLoaded', () => {
const uiManager = new UIManager(data);
uiManager.initialize();
});

class UIManager {
constructor(data) {
this.data = data;
}

initialize() { // header, save 이벤트 생성
    document.getElementById('save').addEventListener('click', () => this.saveData());
    document.getElementById('unitName').addEventListener('change', (event) => this.updateName(event));
    document.getElementById('unitDesc').addEventListener('change', (event) => this.updateDescription(event));
    this.addTemplate();
}

updateName(event) { // name변경사항 data에 업데이트
    let nameObj = this.data.core.find(item => item.hasOwnProperty('name'));
    if (nameObj) {
        nameObj.name = event.target.value;
    }
}

updateDescription(event) { // displayDescription변경사항 data에 업데이트
    let descObj = this.data.core.find(item => item.hasOwnProperty('displayDescription'));
    if (descObj) {
        descObj.displayDescription = event.target.value;
    }
}

addTemplate() { // data를 html형태의 수정 가능한 table로 변환함
    const mainContainer = document.getElementById('sectionContainer');
    mainContainer.innerHTML = '';

    for (const sectionName in this.data) {
        const section = this.data[sectionName];

        const sectionHeader = document.createElement('h3');
        sectionHeader.textContent = sectionName.toUpperCase();
        mainContainer.appendChild(sectionHeader);

        const table = document.createElement('table');

        section.forEach((entry) => {
            const key = Object.keys(entry)[0];
            const value = entry[key];
            const row = document.createElement('tr');
            
            const keyCell = document.createElement('td');
            keyCell.textContent = key;
            row.appendChild(keyCell);
        
            const valueCell = document.createElement('td');
            let inputElement;

            if (typeof value === 'number') { // 값이 숫자일 경우 숫자 입력 칸을 생성
                inputElement = document.createElement('input');
                inputElement.type = 'number';
                inputElement.value = value;
                inputElement.addEventListener('change', (event) => {
                    entry[key] = parseFloat(event.target.value);
                });
            } else if (typeof value === 'boolean') { // boolean값일 경우 true/false 버튼을 생성
                inputElement = document.createElement('button');
                inputElement.textContent = value ? 'true' : 'false';
                inputElement.addEventListener('click', () => {
                    entry[key] = !entry[key];
                    inputElement.textContent = entry[key] ? 'true' : 'false';
                });
                valueCell.appendChild(inputElement);
            } else if (typeof value === 'string') { // 값이 문자열인 경우
                inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.value = value;

                if (key.startsWith('image')) { // 키가 image로 시작하는 경우 파일 입력 버튼을 생성
                    inputElement.type = 'file';
                    inputElement.style.display = 'none';

                    const fileButton = document.createElement('button');
                    fileButton.textContent = value === 'NONE' ? 'NONE' : value;

                    fileButton.addEventListener('click', () => {
                        inputElement.click();
                    });

                    inputElement.addEventListener('change', () => {
                        if (inputElement.files.length > 0) {
                            const file = inputElement.files[0];
                            fileButton.textContent = file.name;
                            entry[key] = file.name;

                            if (key === 'image') {
                                this.displayImage(inputElement);
                            }
                        }
                    });

                    valueCell.appendChild(fileButton);
                } else if (key.startsWith('class')) { // class의 경우 고유 값이므로 보이지만 수정은 불가하게 함
                    inputElement.readOnly = true;
                    inputElement.style.background = 'transparent';
                } else if (key.startsWith('builtFrom')) { // builtFrom의 경우 전용 드롭다운 옵션을 생성
                    inputElement = this.createDropdown(['NONE', 'commandCenter', 'landFactory', 'seaFactory', 'airFactory', 'mechFactory'], entry, key);
                } else if (key.startsWith('movementType')) { // movement Type의 경우 전용 드롭다운 옵션을 생성
                    inputElement = this.createDropdown(['NONE', 'LAND', 'WATER', 'AIR', 'HOVER'], entry, key);
                } else if (key.startsWith('shoot_flame')) { // shoot_flame의 경우 전용 드롭다운 옵션을 생성
                    inputElement = this.createDropdown(['small', 'large'], entry, key);
                } else {
                    inputElement.addEventListener('change', (event) => {
                        entry[key] = event.target.value;
                    });
                }
            }

            if (key !== 'name' && key !== 'displayDescription'){ //name과 displayDescription은 header에 따로 분리했으므로 건너뜀
                if (inputElement) {
                    valueCell.appendChild(inputElement);
                }

                row.appendChild(valueCell);
                table.appendChild(row);
            }           
        });

        mainContainer.appendChild(table);
    }
    const toolTipManager = new ToolTipManager();
    toolTipManager.initialize();
}

createDropdown(options, entry, key) { // 드롭다운 옵션 생성
    const inputElement = document.createElement('select');
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.textContent = option;
        inputElement.appendChild(opt);
    });
    inputElement.addEventListener('change', (event) => {
        entry[key] = event.target.value;
    });
    return inputElement;
}

displayImage(inputElement) { // image를 선택하면 header에 띄움
    const file = inputElement.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const imageSrc = e.target.result;

        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.margin = 'auto';

        const spriteDiv = document.getElementById('sprite');
        spriteDiv.innerHTML = '';
        spriteDiv.appendChild(img);
    };

    reader.readAsDataURL(file);
}


saveData() { // 저장 기능
    const nameObj = this.data.core.find(item => item.hasOwnProperty('name'));
    const iniContent = Utilities.jsonToIni(this.data);
    const content = new Blob([iniContent], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(content);
    downloadLink.download = `${nameObj.name}.ini`;
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);
    console.log(this.data);
}
}