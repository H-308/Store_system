import { useUpdateProductMutation } from "./proApiSlice"
import { useEffect, useState, useRef } from "react"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

const UpdatePro = () => {

    const {id} = useParams()
    const nevigate = useNavigate()
    const [updtaProduct, { isError, isSuccess, isLoading, error }] = useUpdateProductMutation()

    useEffect(() => {
        if (isSuccess) {
            nevigate(`/products`)
        }
    }, [isSuccess])

    const [proData, setProData] = useState({ available: true, id: id})

    const handleChanges = (e) => {
        const { name, value } = e.target
        setProData({ ...proData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updtaProduct(proData)
    }

    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    גרור ושחרר תמונה כאן
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
    if (isLoading)
        return <h1>loading</h1>
    return (
        <div >
            <h1>Update Product</h1>
            {isError && JSON.stringify(error.data)}
            <form onSubmit={(e) => handleSubmit(e)} style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center" }}>

                <div className="card flex justify-content-center" >
                    <FloatLabel >
                        <InputText id="name" name="name" onChange={(e) => handleChanges(e)} />
                        <label htmlFor="name">שם מוצר</label>
                    </FloatLabel>
                </div>

                <div className="card flex justify-content-center" >
                    <FloatLabel >
                        <InputText id="price" name="price" onChange={(e) => handleChanges(e)} />
                        <label htmlFor="price">מחיר</label>
                    </FloatLabel>
                </div>
                <div className="card flex justify-content-center">
                    <FloatLabel>
                        <InputTextarea id="descreption" name="descreption" onChange={(e) => handleChanges(e)} rows={5} cols={30} />
                        <label htmlFor="descreption">תיאור</label>
                    </FloatLabel>
                </div>

                <div>
                    <Toast ref={toast}></Toast>

                    <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                    <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                    <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                    <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                        onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                </div>

                <div className="card flex flex-wrap justify-content-center gap-3">
                    <Button type="submit" label="עדכן" icon="pi pi-check" />
                </div>

            </form>
        </div>
    )
}
export default UpdatePro