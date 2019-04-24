import React, {Component} from 'react';
import axios from 'axios'
import Dropzone from 'react-dropzone';
import {v4 as randomString} from 'uuid';
import Alert from 'react-s-alert';

class AddItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            file: '',
            image: '',
            name: '',
            category: '',
            price: '',
            inventory: '',
            description: '',
        };
    };

    addToDataBase = () => {
        const {image, name, category, price, inventory, description} = this.state;
        console.log(image);
        console.log(name);
        console.log(category);
        console.log(price);
        console.log(inventory);
        console.log(description);
        if (!image || !name || !category || !price || !inventory || !description) {
            Alert.error(`Please check that all forms have been filled out`, {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 2000,
                offset: 100
            });
            return;
        };
        let body = {
            image: image,
            name: name,
            category: category,
            price: price,
            inventory: inventory,
            description: description
        };
        axios.put('/api/newProduct', body).then(() => {
            Alert.success(`Added ${this.state.name} to the database!`, {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 2000,
                offset: 100
            });
        }).catch(err => console.log('error at addToDataBase', err));
    };

    putInAWS = (obj) => {
        const {options, signedRequest} = obj;
        const {file} = this.state;
        axios.put(signedRequest, file, options).then((res) => {
            Alert.success(`Image put in AWS`, {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 2000,
                offset: 100
            });
        }).catch(err => console.log('error at addToAws', err))
    };

    generateAWSLink = (obj) => {
        axios.put('/aws/getLink', obj).then(res => {
            const {signedRequest, url} = res.data;
            this.setState({ image: url })
            const options = {
                headers: {
                    'Content-Type': obj.fileType
                }
            };
            this.putInAWS({signedRequest, options});
        }).catch(err => console.log('error at generateLink', err));
    };

    onDrop = (file) => {
        file = file[0];
        this.setState({ file: file });
        const replaceName = `${file.name.replace(/\s/g, '-')}`;
        const fileName = `${randomString()}-${replaceName}`;
        const fileType = file.type;
        this.generateAWSLink({fileName, fileType});
    };

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
        console.log(name, value);
    };

    render() {
        return(
            <div>
                 <Dropzone onDropAccepted={this.onDrop} multiple={false}>
                    {
                    ({getRootProps, getInputProps})=> (
                        <section className="aws-drop-zone">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <button>Image</button>
                        </div>
                        </section>
                    )
                    }
                </Dropzone>
                <input placeholder="Product Name" name="name" onChange={this.onChange}/>
                <input placeholder="Price" name="price" type="text" onChange={this.onChange}/>
                <select onChange={(e) => this.setState({ category: e.target.value})}>
                    <option value="car care">Car Care</option>
                    <option value="tools">Tools</option>
                    <option value="paint">Paint</option>
                    <option value="mask">Mask</option>
                </select>
                <input placeholder="Inventory" name="inventory" onChange={this.onChange}/>
                <input placeholder="Description" name="description" onChange={this.onChange}/>
                <button onClick={() => this.addToDataBase()}>Add To Store</button>
            </div>
        );
    };
};

export default AddItem;