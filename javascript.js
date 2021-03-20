let form = document.getElementById("myForm");

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let search = document.getElementById("search").value;

    let originalName = search.split(' ').join('');

    fetch("https://api.github.com/users/" + originalName)
        .then((result) => result.json())
        .then((data) => {
            console.log(`https://api.github.com/users/${originalName}/repos`);

            document.getElementById("image").innerHTML = `
                <img class="rounded-circle rounded mx-auto d-block" width="200" height="200" src="${data.avatar_url}"/>`

            document.getElementById("github").innerHTML = `
                <a href="https://www.github.com/${originalName}">
                <button class="btn btn-danger">GitHub</button>&nbsp<button class="btn btn-danger">${data.followers} Followers</button>&nbsp<button class="btn btn-danger">${data.following} Following</button>`

            document.getElementById("table").innerHTML = `
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Public Repos</th>
                        <th scope="col">Role</th>
                        <th scope="col">Location</th>
                        <th scope="col">CreatedOn</th>
                        <th scope="col">ModifiedOn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>${data.email}</td>
                        <td>${data.public_repos}</td>
                        <td>${data.type}</td>
                        <td>${data.location}</td>
                        <td>${data.created_at}</td>
                        <td>${data.updated_at}</td>
                    </tr>
                </tbody>`
        });

    fetch(`https://api.github.com/users/${originalName}/repos?per_page=1000`)
        .then((result) => result.json())
        .then((data) => {
            console.log(data);

            document.getElementById("repos").innerHTML = ``;
            document.getElementById("repos").innerHTML += `
            <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Repo Name</th>
                        <th scope="col">Language</th>
                        <th scope="col">IsPrivate</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Size</th>
                        <th scope="col">License</th>
                        <th scope="col">Stars</th>
                        <th scope="col">GitHub</th>
                    </tr>
                </thead>
            `

            Object.keys(data).forEach(function(key) {
                document.getElementById("repos").innerHTML += `
                <tbody>
                    <tr>
                        <td>${Number(key) + 1}</td>
                        <td>${data[key].name}</td>
                        <td>${data[key].language==null?"---":data[key].language}</td>
                        <td>${data[key].private}</td>
                        <td>${data[key].owner.login}</td>
                        <td>${Number(data[key].size)/1000} MB</td>
                        <td>${data[key].license==null?"---":data[key].license.spdx_id}</td>
                        <td>${data[key].stargazers_count}</td>
                        <td><a href="${data[key].html_url}"><button class="btn btn-danger">Link</button></a></td>
                    </tr>
                </tbody>
                
                `
                console.log(data[key].full_name);
            });
        });
});