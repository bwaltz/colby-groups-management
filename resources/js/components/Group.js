import React, { Component } from "react";
import Nestable from "react-nestable";
import _remove from "lodash/remove";
import "./style.css";
// import Loader from "colby-loader";
import { Link } from "react-router-dom";

export default class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            group: {}
        };

        // this.openModal = this.openModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);
        // this.handleNameChange = this.handleNameChange.bind(this);
        // this.handleLabelChange = this.handleLabelChange.bind(this);
        // this.addGroup = this.addGroup.bind(this);
        // this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        // this.modifyTree = this.modifyTree.bind(this);
        // this.generateRand = this.generateRand.bind(this);
        // this.onTreeChange = this.onTreeChange.bind(this);
        // this.saveGroups = this.saveGroups.bind(this);
        // this.editGroup = this.editGroup.bind(this);
        // this.deleteGroup = this.deleteGroup.bind(this);
        // this.removeItemInTree = this.removeItemInTree.bind(this);
    }

    componentDidMount() {
        this.getGroup();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getGroup();
        }
    }

    getGroup() {
        const groupId = this.props.match.params.id;
        axios.get(`/api/groups/${groupId}`).then(response => {
            this.setState({
                group: response.data.data,
                loading: false
            });
        });
    }

    saveGroups() {
        this.setState({
            loading: true
        });

        this.removeNewIds(this.state.groups[0]);

        axios
            .put("/api/groups", { groups: this.state.groups })
            .then(response => {
                this.getGroups();
            });
    }

    removeNewIds(element) {
        if (element.new) {
            delete element.id;
            return element;
        } else if (element.children) {
            var i;
            var result = null;
            for (i = 0; result == null && i < element.children.length; i++) {
                result = this.removeNewIds(element.children[i]);
            }
            return result;
        }

        return null;
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    generateRand() {
        return Math.floor(Math.random() * 1000000001);
    }

    addGroup() {
        this.modifyTree(this.state.groups[0], this.state.group.parent_id);

        this.setState({
            modalIsOpen: false,
            flatGroups: [...this.state.flatGroups, this.state.group],
            group: {
                name: "",
                description: "",
                label: "",
                parent_id: 1,
                new: true
            }
        });
    }

    modifyTree(element, matchingId) {
        if (element.id === matchingId) {
            element.children.push(this.state.group);
            return element;
        } else if (element.children) {
            var i;
            var result = null;
            for (i = 0; result == null && i < element.children.length; i++) {
                result = this.modifyTree(element.children[i], matchingId);
            }
            return result;
        }

        return null;
    }

    deleteGroup(element) {
        const tree = this.removeItemInTree(
            this.state.groups[0],
            element.id,
            element.parent_id
        );

        this.setState({
            groups: [tree]
        });
    }

    removeItemInTree(element, itemId) {
        element.children = element.children
            .filter(child => {
                return child.id !== itemId;
            })
            .map(child => {
                return this.removeItemInTree(child, itemId);
            });
        return element;
    }

    handleNameChange(event) {
        this.setState({
            ...this.state,
            group: {
                ...this.state.group,
                name: event.target.value
            }
        });
    }

    handleLabelChange(event) {
        this.setState({
            ...this.state,
            group: {
                ...this.state.group,
                label: event.target.value
            }
        });
    }

    handleParentChange(event) {
        this.setState({
            ...this.state,
            group: {
                ...this.state.group,
                parent_id: event
            }
        });
    }

    handleDescriptionChange(event) {
        this.setState({
            ...this.state,
            group: {
                ...this.state.group,
                description: event.target.value
            }
        });
    }

    onTreeChange(items, item) {
        this.setState({
            groups: items
        });
    }

    editGroup(element) {
        this.setState({
            group: element,
            modalIsOpen: true
        });
    }

    render() {
        const renderItem = ({ item }) => {
            return (
                <div
                    style={{
                        border: "1px solid #ccc",
                        background: "rgb(255, 255, 255)",
                        boxShadow: "rgb(173, 173, 173) 0px 0px 5px",
                        cursor: "move",
                        fontSize: "0.9em",
                        display: "flex"
                    }}
                    key={item.id}
                >
                    <div>
                        <button
                            className="MuiButtonBase-root MuiIconButton-root"
                            tabIndex="0"
                            type="button"
                            draggable="true"
                        >
                            <span className="MuiIconButton-label">
                                <svg
                                    className="MuiSvgIcon-root"
                                    focusable="false"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    role="presentation"
                                >
                                    <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path>
                                </svg>
                            </span>
                            <span className="MuiTouchRipple-root"></span>
                        </button>
                    </div>
                    <div className="MuiBox-root jss174">
                        <div className="MuiInputBase-root MuiInputBase-fullWidth">
                            {item.name}
                        </div>
                    </div>
                    <div>
                        <Link
                            className="MuiButtonBase-root MuiIconButton-root"
                            tabIndex="0"
                            type="button"
                            to={`/group/${item.id}`}
                        >
                            <span className="MuiIconButton-label">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-log-in"
                                >
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                    <polyline points="10 17 15 12 10 7"></polyline>
                                    <line x1="15" y1="12" x2="3" y2="12"></line>
                                </svg>
                            </span>
                        </Link>
                        <button
                            className="MuiButtonBase-root MuiIconButton-root"
                            tabIndex="0"
                            type="button"
                            onClick={this.editGroup.bind(null, item)}
                        >
                            <span className="MuiIconButton-label">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-edit-2"
                                >
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                </svg>
                            </span>
                        </button>
                        <button
                            className="MuiButtonBase-root MuiIconButton-root"
                            tabIndex="0"
                            type="button"
                            onClick={this.deleteGroup.bind(null, item)}
                        >
                            <span className="MuiIconButton-label">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-x"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            );
        };

        console.log(this.state);
        return (
            <div className="container" key={this.props.match.params.id}>
                <div className="row">
                    <div role="main" className="col-sm-12">
                        <h1>{this.state.group.name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div
                        role="main"
                        className="col-sm-12"
                        style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                        <Link to="/">{"< Home"}</Link>
                    </div>
                </div>
                <div className="row">
                    <div role="main" className="col-sm-6">
                        <Nestable
                            items={[this.state.group]}
                            renderItem={renderItem}
                            onChange={this.onTreeChange}
                        />
                    </div>
                    <div
                        role="main"
                        className="col-sm-6"
                        style={{
                            backgroundColor: "#efefef",
                            borderRadius: "4px",
                            paddingTop: "10px"
                        }}
                    >
                        <form>
                            <h2>Details</h2>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    className="form-control"
                                    value={this.state.group.name}
                                    onChange={this.handleNameChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    value={this.state.group.description}
                                    onChange={this.handleDescriptionChange}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
